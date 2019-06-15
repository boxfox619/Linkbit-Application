import { AsyncStorage } from 'react-native'

const TRANSACTION_STORAGE_KEY = "transaction"
const TMP_TRANSACTION_STORAGE_KEY = "tmp_transaction"
export default class TransactionStorageApi {
    transactionMap
    tmpTransactionMap

    constructor(symbol, address) {
        this.symbol = symbol
        this.address = address
    }

    loadTransactionMap = async (key) => {
        const transactionStorage = JSON.parse(await AsyncStorage.getItem(key) || '{}')
        const symbolMap = transactionStorage[this.symbol] || {}
        return symbolMap[this.address] || {}
    }

    getTransactionMap = async () => {
        if (!this.transactionMap) {
            this.transactionMap = await this.loadTransactionMap(TRANSACTION_STORAGE_KEY)
        }
        return this.transactionMap
    }

    getTmpTransactionMap = async () => {
        if (!this.tmpTransactionMap) {
            this.tmpTransactionMap = await this.loadTransactionMap(TMP_TRANSACTION_STORAGE_KEY)
        }
        return this.tmpTransactionMap
    }

    addTmpTransaction = async (transaction) => {
        const data = await this.getTmpTransactionMap()
        data[transaction.hash] = transaction
        this.tmpTransactionMap = data
        await this.saveTransactionMap(TMP_TRANSACTION_STORAGE_KEY, data)
    }

    removeTmpTransaction = async (transactionHash) => {
        const data = await this.getTmpTransactionMap()
        delete data[transactionHash]
        this.tmpTransactionMap = data
        await this.saveTransactionMap(TRANSACTION_STORAGE_KEY, data)
    }

    setTransactions = async (transactions) => {
        const originalTransactionMap = await this.getTransactionMap()
        const data = transactions.reduce((transactionMap, transaction) => {
            transactionMap[transaction.hash] = transaction
            delete this.tmpTransactionMap[transaction.hash]
            return transactionMap
        }, originalTransactionMap)
        this.transactionMap = await this.saveTransactionMap(TRANSACTION_STORAGE_KEY, data)
        this.tmpTransactionMap = await this.saveTransactionMap(TMP_TRANSACTION_STORAGE_KEY, this.tmpTransactionMap)
    }

    getTransactions = async () => {
        const transactionMap = await this.getTransactionMap()
        return Object.values(transactionMap).filter(t => !!t && !!t.block).sort((tr, tr2) => tr2.block - tr.block)
    }

    getTmpTransactions = async () => {
        const transactionMap = await this.getTmpTransactionMap()
        return Object.values(transactionMap).filter(t => !!t && !!t.block).sort((tr, tr2) => tr2.block - tr.block)
    }

    saveTransactionMap = async (key, transactionMap) => {
        const transactionStorage = JSON.parse(await AsyncStorage.getItem(key) || '{}')
        const symbolMap = transactionStorage[this.symbol] || {}
        symbolMap[this.address] = transactionMap
        transactionStorage[this.symbol] = symbolMap
        await AsyncStorage.setItem(key, JSON.stringify(transactionStorage))
        return transactionMap
    }

    clear = async () => {
        await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify({}))
    }

}