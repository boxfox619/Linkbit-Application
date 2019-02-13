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

    fetchNewTransactions = async () => {
        this.loading = true
        const lastBlockNum = await this.transactionStorageApi.getLastBlock()
        const res = await this.transactionNetworkApi.fetchNewTransactions(lastBlockNum)
        let lastBlock = lastBlockNum
        res.forEach(t => {
            if (lastBlock < t.block) {
                lastBlock = t.block;
            }
        })
        await this.transactionStorageApi.updateTransactions(res, lastBlock+1)
        res.forEach(tr => this.updateTransaction(tr))
        this.loading = false
    }

    refreshProcessingTransactions = async () => {
        this.loading = true
        const txList = this.transactions.filter(tr => tr.status === 'progress').map(tr => tr.hash)
        const resultTransactions = await this.transactionNetworkApi.fetchTransactions(txList)
        await this.transactionStorageApi.updateTransactions(resultTransactions)
        resultTransactions.forEach(tr => this.updateTransaction(tr))
        this.loading = false
    }

    updateTransaction = (transaction) => {
        runInAction(() => {
            const transactionModel = new Transaction()
            transactionModel.updateFromJson(transaction)
            const currentTransactions = [...this.transactions]
            const idx = this.transactions.findIndex(tr2 => tr2.hash === transactionModel.hash)
            if(idx > 0){
                currentTransactions.splice(idx, 1, transactionModel)
            }else{
                currentTransactions.push(transactionModel)
            }
            this.transactions = currentTransactions
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
