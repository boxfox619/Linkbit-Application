import {AsyncStorage} from 'react-native'

const COIN_STORAGE_KEY = 'coin';
export default class CoinStorageApi {
    coinPriceMap = {}

    getCoinPrice = async(symbol) => {
        if(Object.keys(this.coinPriceMap).length === 0){
            await this.loadCoinPriceMap()
        }
        return this.coinPriceMap[symbol]
    }

    updatePrice = async(symbol, price) => {
        this.coinPriceMap[symbol] = price
        await this.save()
    }

    loadCoins = async () => {
        this.coinPriceMap = JSON.parse(await AsyncStorage.getItem(COIN_STORAGE_KEY) || '{}')
    }

    save = async() => {
        await AsyncStorage.setItem(COIN_STORAGE_KEY, JSON.stringify(this.coinPriceMap))
    }
}