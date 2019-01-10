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
            transactionMap[TRANSACTION_STORAGE_KEY] = blockNum
        }
        await this.saveTransactionMap(transactionMap)
    }

    getTransactions = async () => {
        const transactionMap = await this.getTransactionMap()
        return transactionMap.values().sort((tr, tr2) => tr2.block - tr.block)
    }

    getLastBlock = async () => {
        const transactionMap = await this.getTransactionMap()
        return transactionMap[LAST_LOADED_BLOCK] || 0
    }

    saveTransactionMap = async (transactionMap) => {
        const symbolMap = transactionMap[this.symbol] || {}
        symbolMap[this.address] = this.transactionMap
        transactionMap[this.symbol] = symbolMap
        this.transactionMap = transactionMap
        await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactionMap))
    }

}