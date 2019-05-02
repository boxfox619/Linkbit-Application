import {observable, computed, runInAction} from 'mobx'
import Transaction from './Transaction'
import TransactionStorageApi from "../../api/Transaction/TransactionStorageApi";
import TransactionNetworkApi from "../../api/Transaction/TransactionNetworkApi";

export default class TransactionStore {
    @observable transactions = []
    @observable loading = false
    symbol
    address
    transactionStorageApi
    transactionNetworkApi

    constructor(symbol, address) {
        this.symbol = symbol
        this.address = address
        this.transactionStorageApi = new TransactionStorageApi(symbol, address)
        this.transactionNetworkApi = new TransactionNetworkApi(symbol, address)
    }

    loadTransactions = async () => {
        this.loading = true
        const transactions = await this.transactionStorageApi.getTransactions()
        runInAction(() => {
            this.transactions = transactions.map(transaction => {
                const transactionModel = new Transaction()
                transactionModel.updateFromJson(transaction)
                return transactionModel
            })
        })
        this.loading = false
    }

    refreshTransactions = async () => {
        this.loading = true
        const lastBlockNum = await this.transactionStorageApi.getLastBlock()
        const res = await this.transactionNetworkApi.fetchNewTransactions(0)
        let lastBlock = lastBlockNum
        res.forEach(t => {
            if (lastBlock < t.block) {
                lastBlock = t.block;
            }
        })
        await this.transactionStorageApi.updateTransactions(res, lastBlock + 1)
        res.forEach(tr => this.updateTransaction(tr))
        this.loading = false
    }

    updateTransaction = (transaction) => {
        runInAction(() => {
            const idx = this.transactions.findIndex(tr2 => tr2.hash === transaction.hash)
            if (idx >= 0) {
                this.transactions[idx].updateFromJson(transaction)
            } else {
                const transactionModel = new Transaction()
                transactionModel.updateFromJson(transaction)
                this.transactions.unshift(transactionModel)
            }
        })
    }

    @computed get transactionList() {
        return this.transactions.map(tr => {
            const benefit = tr.targetAddress === this.address
            let address = benefit ? tr.sourceAddress : tr.targetAddress
            return {...tr, benefit, address, symbol: this.symbol}
        })
    }

    @computed get transactionCount() {
        return this.transactions.length
    }
}
