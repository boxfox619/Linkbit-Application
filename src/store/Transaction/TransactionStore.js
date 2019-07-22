import { observable, computed, runInAction } from 'mobx'
import Transaction from './Transaction'
import TransactionStorageApi from '../../api/Transaction/TransactionStorageApi'
import walletManager from '../../libs/wallet'
import { handleError } from '../../libs/ErrorHandler'
import i18n from '../../libs/Locale'

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
      try {
        const transactions = await this.transactionStorageApi.getTransactions()
        runInAction(() => {
          this.transactions = transactions.map(this.convertTransaction)
        })
      } catch (err) {
        handleError(err)
        throw new Error(i18n.t('failed_update_transaction'))
      } finally {
        this.loading = false
      }
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

    @computed get transactionList() {
      return this.transactions.map(tr => {
        const benefit = tr.targetAddress.toLowerCase() === this.address.toLowerCase()
        const address = benefit ? tr.sourceAddress : tr.targetAddress
        
        return { ...tr, benefit, address, symbol: this.symbol }
      })
    }

    @computed get transactionCount() {
      return this.transactions.length
    }
}
