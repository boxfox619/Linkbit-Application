import {AsyncStorage} from 'react-native'

const COIN_STORAGE_KEY = 'coin';
export default class CoinStorageApi {
    coinPriceMap = {}

    getPrice = (symbol) => {
        return this.coinPriceMap[symbol]
    }

    updatePrice = async(symbol, price) => {
        this.coinPriceMap[symbol] = price
        await this.save()
    }

    load = async () => {
        this.coinPriceMap = JSON.parse(await AsyncStorage.getItem(COIN_STORAGE_KEY) || '{}')
    }

    save = async() => {
        await AsyncStorage.setItem(COIN_STORAGE_KEY, JSON.stringify(this.coinPriceMap))
    }
}