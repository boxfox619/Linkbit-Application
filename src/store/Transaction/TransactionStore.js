import {observable, computed, runInAction, action} from 'mobx'
import Transaction from './Transaction'
import TransactionStorageApi from "../../api/Transaction/TransactionStorageApi";
import walletManager from '../../libs/wallet'

export default class TransactionStore {
    @observable transactions = []
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
        const res = await walletManager[this.symbol].loadTransaction(this.address)
        await this.transactionStorageApi.setTransactions(res)
        this.setTransactions(res)
        this.loading = false
    }

    @action setTransactions(transactions) {
        this.transactions = transactions.map(tr => new Transaction().updateFromJson(tr))
    }

    @computed get transactionList() {
        return this.transactions.map(tr => {
            const benefit = tr.targetAddress.toLowerCase() === this.address.toLowerCase()
            let address = benefit ? tr.sourceAddress : tr.targetAddress
            return {...tr, benefit, address, symbol: this.symbol}
        })
    }

    @computed get transactionCount() {
        return this.transactions.length
    }
}
