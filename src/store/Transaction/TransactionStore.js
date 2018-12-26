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
        const transactions = await this.transactionStorageApi.load()
        runInAction(() => {
            this.transactions = transactions.map(transaction => {
                const transactionModel = new Transaction()
                transactionModel.updateFromJson(transaction)
                return transactionModel
            })
        })
    }

    fetchNewTransactions = async () => {
        const lastBlockNum = await this.transactionStorageApi.getLastBlock()
        const res = await this.transactionNetworkApi.fetchNewTransactions(lastBlockNum)
        await this.transactionStorageApi.save(res.transactions, res.blockNum)
        await this.loadTransactions()
    }

    refreshProcessingTransactions = async () => {
        const txList = this.transactions.filter(tr => tr.status === 'progress').map(tr => tr.hash)
        const resultTransactions = await this.transactionNetworkApi.fetchTransactions(txList)
        await this.transactionStorageApi.save(resultTransactions)
        runInAction(() => {
            const currentTransactions = [...this.transactions]
            resultTransactions.forEach(tr => {
                const idx = this.transactions.findIndex(tr2 => tr2.hash === tr.hash)
                currentTransactions.splice(idx, 1, tr)
            })
            this.transactions = currentTransactions
        })
    }

    @computed get transactionCount() {
        return this.transactions.length
    }
}
