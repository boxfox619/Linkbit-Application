import {AsyncStorage} from 'react-native'

const TRANSACTION_STORAGE_KEY = "transaction"
export default class TransactionStorageApi {
    transactionMap

    constructor(symbol, address) {
        this.symbol = symbol
        this.address = address
    }

    getTransactionMap = async () => {
        if(!this.transactionMap){
            const transactionStorage = JSON.parse(await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY) || '{}')
            const symbolMap = transactionStorage[this.symbol] || {}
            this.transactionMap = symbolMap[this.address] || {}
        }
        return this.transactionMap
    }

    setTransactions = async (transactions) => {
        const data = transactions.reduce((trnasactionMap, transaction) => {
            trnasactionMap[transaction.hash] = transaction
            return trnasactionMap
        }, this.transactionMap)
        await this.saveTransactionMap(data)
    }

    getTransactions = async () => {
        const transactionMap = await this.getTransactionMap()
        return Object.values(transactionMap).filter(t => typeof t === "object").sort((tr, tr2) => tr2.block - tr.block)
    }

    saveTransactionMap = async (transactionMap) => {
        const transactionStorage = JSON.parse(await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY) || '{}')
        const symbolMap = transactionStorage[this.symbol] || {}
        symbolMap[this.address] = transactionMap
        transactionStorage[this.symbol] = symbolMap
        this.transactionMap = transactionMap
        await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactionStorage))
    }

    clear = async () => {
        await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify({}))
    }

}