import {AsyncStorage} from 'react-native';

const TRANSACTION_STORAGE_KEY = "transaction";
export default class TransactionStorageApi {
    save = async (symbol, address, newTransactions) => {
        const transactionStorage = AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)
        const symbolMap = transactionStorage[symbol] || {}
        const transactionMap = symbolMap[address] || {}
        newTransactions.forEach((transaction) => {
            transactionMap[transaction.hash] = transaction
        })
        symbolMap[address] = transactionMap
        transactionStorage[symbol] = symbolMap
        AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, transactionStorage)
    }

    load = async (symbol, address) => {
        const transactionStorage = AsyncStorage.getItem(TRANSACTION_STORAGE_KEY)
        const symbolMap = transactionStorage[symbol] || {}
        const transactionMap = symbolMap[address] || {}
        return transactionMap.values().sort((tr, tr2) => tr2.block - tr.block);
    }

}