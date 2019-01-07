import {AsyncStorage} from 'react-native'

const TRANSACTION_STORAGE_KEY = "transaction"
const LAST_LOADED_BLOCK = "LastBlock"
class TransactionStorageApi {

    constructor(symbol, address, transactionMap) {
        this.symbol = symbol
        this.address = address
        this.transactionMap = transactionMap
    }

    updateTransactions = async (newTransactions, blockNum) => {
        newTransactions.forEach((transaction) => {
            this.transactionMap[transaction.hash] = transaction
        })
        if (!!blockNum) {
            this.transactionMap[TRANSACTION_STORAGE_KEY] = blockNum
        }
        await this.saveTransactionMap()
    }

    getTransactions = () => this.transactionMap.values().sort((tr, tr2) => tr2.block - tr.block)

    getLastBlock = () => this.transactionMap[LAST_LOADED_BLOCK] || 0

    saveTransactionMap = async () => {
        const transactionMap = JSON.parse(await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY) || '{}')
        const symbolMap = transactionMap[this.symbol] || {}
        symbolMap[this.address] = this.transactionMap
        transactionMap[this.symbol] = symbolMap
        await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactionMap))
    }

}

export default async (symbol, address) => {
    const transactionStorage = JSON.parse(await AsyncStorage.getItem(TRANSACTION_STORAGE_KEY) || '{}')
    const symbolMap = transactionStorage[symbol] || {}
    const transactionMap = symbolMap[address] || {}
    return TransactionStorageApi(symbol, address, transactionMap);
}