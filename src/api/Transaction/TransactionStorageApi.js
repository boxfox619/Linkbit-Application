import {AsyncStorage} from 'react-native'

const TRANSACTION_STORAGE_KEY = "transaction"
const LAST_LOADED_BLOCK = "LastBlock"
export default class TransactionStorageApi {
    constructor(symbol, address) {
        this.symbol = symbol
        this.address = address
    }

    save = async (newTransactions, blockNum) => {
        const transactionStorage = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)
        const symbolMap = transactionStorage[this.symbol] || {}
        const transactionMap = symbolMap[this.address] || {}
        newTransactions.forEach((transaction) => {
            transactionMap[transaction.hash] = transaction
        })
        transactionMap[TRANSACTION_STORAGE_KEY] = blockNum
        symbolMap[this.address] = transactionMap
        transactionStorage[this.symbol] = symbolMap
        await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, transactionStorage)
    }

    load = async () => {
        const transactionStorage = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)
        const symbolMap = transactionStorage[this.symbol] || {}
        const transactionMap = symbolMap[this.address] || {}
        return transactionMap.values().sort((tr, tr2) => tr2.block - tr.block);
    }

    getLastBlock = async () => {
        const transactionStorage = await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)
        const symbolMap = transactionStorage[this.symbol] || {}
        const transactionMap = symbolMap[this.address] || {}
        const lastBlockNum = transactionMap[LAST_LOADED_BLOCK] || 0
        return lastBlockNum
    }

}