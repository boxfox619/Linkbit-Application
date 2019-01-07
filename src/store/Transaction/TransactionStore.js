import {observable, computed, runInAction} from 'mobx'
import Transaction from './Transaction'
import TransactionStorageApi from "../../api/Transaction/TransactionStorageApi";
import TransactionNetworkApi from "../../api/Transaction/TransactionNetworkApi";

export default class TransactionStore {
    @observable transactions = []
    transactionStorageApi
    transactionNetworkApi

    constructor(symbol, address) {
        this.transactionStorageApi = new TransactionStorageApi(symbol, address)
        this.transactionNetworkApi = new TransactionNetworkApi(symbol, address)
    }

    loadTransactions = async () => {
        await this.transactionStorageApi.loadTransactionMap()
        const transactions = this.transactionStorageApi.getTransactions()
        runInAction(() => {
            this.transactions = transactions.map(transaction => {
                const transactionModel = new Transaction()
                transactionModel.updateFromJson(transaction)
                return transactionModel
            })
        })
    }

    fetchNewTransactions = async () => {
        const lastBlockNum = this.transactionStorageApi.getLastBlock()
        const res = await this.transactionNetworkApi.fetchNewTransactions(lastBlockNum)
        await this.transactionStorageApi.updateTransactions(res.transactions, res.blockNum)
        await this.loadTransactions()
    }

    refreshProcessingTransactions = async () => {
        const txList = this.transactions.filter(tr => tr.status === 'progress').map(tr => tr.hash)
        const resultTransactions = await this.transactionNetworkApi.fetchTransactions(txList)
        await this.transactionStorageApi.updateTransactions(resultTransactions)
        await this.loadTransactions()
    }

    updateTransaction = async (transaction) => {
        this.transactionStorageApi.updateTransactions([transaction])
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
