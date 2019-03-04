import {AsyncStorage} from 'react-native'

const TRANSACTION_STORAGE_KEY = "transaction"
const LAST_LOADED_BLOCK = "LastBlock"
export default class TransactionStorageApi {
    transactionMap

    constructor(symbol, address) {
        this.symbol = symbol
        this.address = address
    }

    getTransactionMap = async () => {
        AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, '{}')
        AsyncStorage.setItem(LAST_LOADED_BLOCK, '0')
        if(!this.transactionMap){
            const transactionStorage = JSON.parse(await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY) || '{}')
            const symbolMap = transactionStorage[this.symbol] || {}
            this.transactionMap = symbolMap[this.address] || {}
        }
        return this.transactionMap
    }


    updateTransactions = async (newTransactions, blockNum) => {
        const transactionMap = await this.getTransactionMap()
        newTransactions.forEach((transaction) => {
            transactionMap[transaction.hash] = transaction
        })
        if (!!blockNum) {
            transactionMap[LAST_LOADED_BLOCK] = blockNum
        }
        await this.saveTransactionMap(transactionMap)
    }

    getTransactions = async () => {
        const transactionMap = await this.getTransactionMap()
        return Object.values(transactionMap).filter(t => typeof t === "object").sort((tr, tr2) => tr2.block - tr.block)
    }

    getLastBlock = async () => {
        const transactionMap = await this.getTransactionMap()
        const block = transactionMap[LAST_LOADED_BLOCK]
        return  !!block ? block : 0
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