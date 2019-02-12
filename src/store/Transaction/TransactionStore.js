import {observable, computed, runInAction} from 'mobx'
import Transaction from './Transaction'
import TransactionStorageApi from "../../api/Transaction/TransactionStorageApi";
import TransactionNetworkApi from "../../api/Transaction/TransactionNetworkApi";

export default class TransactionStore {
    @observable transactions = []
    @observable loading = false
    transactionStorageApi
    transactionNetworkApi

    constructor(symbol, address) {
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
        await this.transactionStorageApi.updateTransactions(res.transactions, res.blockNum)
        res.transactions.forEach(tr => this.updateTransaction(tr))
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
            const currentTransactions = [...this.transactions]
            const idx = this.transactions.findIndex(tr2 => tr2.hash === transaction.hash)
            if(idx > 0){
                currentTransactions.splice(idx, 1, transaction)
            }else{
                currentTransactions.push(transaction)
            }
            this.transactions = currentTransactions
        })
    }

    @computed get transactionCount() {
        return this.transactions.length
    }
}
