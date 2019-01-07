import {AsyncStorage} from 'react-native'

const TRANSACTION_STORAGE_KEY = "transaction"
const LAST_LOADED_BLOCK = "LastBlock"
export default class TransactionStorageApi {
    transactionMap = undefined

    constructor(symbol, address) {
        this.symbol = symbol
        this.address = address
        this.transactionMap = await this.loadTrnasactionMap()
    }

    updateTransactions = async (newTransactions, blockNum) => {
        newTransactions.forEach((transaction) => {
            this.transactionMap[transaction.hash] = transaction
        })
        if (!!blockNum) {
            this.transactionMap[TRANSACTION_STORAGE_KEY] = blockNum
        }
    }

    getTransactions = () => this.transactionMap.values().sort((tr, tr2) => tr2.block - tr.block)

    getLastBlock = () => this.transactionMap[LAST_LOADED_BLOCK] || 0

    loadTransactionStorage = async() => {
        const str = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY) || '{}'
        return JSON.parse(str)
    }

    loadTrnasactionMap = async () => {
        const transactionMap = await this.loadTransactionStorage()
        const symbolMap = transactionMap[this.symbol] || {}
        return symbolMap[this.address] || {}
    }

    saveTransactionMap = async () => {
        const transactionMap = await this.loadTransactionStorage()
        const symbolMap = transactionMap[this.symbol] || {}
        symbolMap[this.address] = this.transactionMap
        transactionMap[this.symbol] = symbolMap
        await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactionMap))
    }

}