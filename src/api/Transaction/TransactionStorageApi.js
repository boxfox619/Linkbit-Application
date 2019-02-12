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
        const transactionList = Object.values(transactionMap).sort((tr, tr2) => tr2.block - tr.block)
        transactionList.push({
            hash: 'hash',
            symbol: 'ETH',
            benefit: false,
            targetAddress: 'Linkbit-1234',
            targetUser: 'Boxfox',
            amount: 13.221,
            status: true,
            date: '2018.12.12',
            address: '0xasasdasd',
            confirm: 11111
        },
            {
                hash: 'hash2',
                symbol: 'ETH',
                benefit: true,
                targetAddress: 'Linkbit-1234',
                targetUser: 'Boxfox',
                amount: 13.221,
                status: true,
                date: '2018.12.12',
                address: '0xasasdasd',
                confirm: 11111
            })
        return transactionList
    }

    getLastBlock = async () => {
        const transactionMap = await this.getTransactionMap()
        const block = transactionMap[LAST_LOADED_BLOCK]
        return  !!block ? block : 0
    }

    saveTransactionMap = async (transactionMap) => {
        const symbolMap = transactionMap[this.symbol] || {}
        symbolMap[this.address] = this.transactionMap
        transactionMap[this.symbol] = symbolMap
        this.transactionMap = transactionMap
        await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactionMap))
    }

}