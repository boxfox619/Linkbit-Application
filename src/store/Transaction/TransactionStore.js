import { observable, computed, runInAction, action } from 'mobx'
import Transaction from './Transaction'
import TransactionStorageApi from "../../api/Transaction/TransactionStorageApi";
import walletManager from '../../libs/wallet'

export default class TransactionStore {
    @observable transactions = []
    @observable tmpTransactions = []
    @observable loading = false
    symbol
    address
    transactionStorageApi

    constructor(symbol, address) {
        this.symbol = symbol
        this.address = address
        this.transactionStorageApi = new TransactionStorageApi(symbol, address)
    }

    loadTransactions = async () => {
        this.loading = true
        const transactions = await this.transactionStorageApi.getTransactions()
        const tmpTransactions = await this.transactionStorageApi.getTmpTransactions()
        runInAction(() => {
            this.transactions = transactions.map(this.convertTransaction)
            this.tmpTransactions = tmpTransactions.map(this.convertTransaction)
        })
        this.loading = false
    }

    convertTransaction = transaction => {
        const transactionModel = new Transaction()
        transactionModel.updateFromJson(transaction)
        return transactionModel
    }

    refreshTransactions = async () => {
        this.loading = true
        const newTransactionList = await walletManager[this.symbol].loadTransaction(this.address)
        await this.transactionStorageApi.setTransactions(newTransactionList)
        await this.loadTransactions()
        this.loading = false
    }

    saveTempTransaction = async (transaction) => {
        await this.transactionStorageApi.addTmpTransaction(transaction)
        const tmpTransaction = this.convertTransaction(transaction)
        this.tmpTransactions.push(tmpTransaction)
    }

    @computed get transactionList() {
        return [...this.tmpTransactions, ...this.transactions].map(tr => {
            const benefit = tr.targetAddress.toLowerCase() === this.address.toLowerCase()
            let address = benefit ? tr.sourceAddress : tr.targetAddress
            return { ...tr, benefit, address, symbol: this.symbol }
        })
    }

    @computed get transactionCount() {
        return this.transactions.length + this.tmpTransactions.length
    }
}
