import {observable, computed, action} from 'mobx'
import CoinNetworkApi from './../../api/Coin/CoinNetworkApi'
import CoinStorageApi from './../../api/Coin/CoinStorageApi'
import SettingStore from '../SettingStore'
import { COIN_INFO } from '../../libs/Constraints';

class CoinPriceStore {
    @observable isLoading = false
    coinPriceMap
    coinNetworkApi
    coinStorageApi

    constructor() {
        this.coinNetworkApi = new CoinNetworkApi()
        this.coinStorageApi = new CoinStorageApi()
        this.coinPriceMap = {}
    }

    refreshCoinsPrice = async () => {
        const promiseList = COIN_INFO.map(coin => ({...coin, price: this.coinNetworkApi.fetchCoinPrice(coin.symbol, SettingStore.currency)}))
        const coins = await Promise.all(promiseList)
        coins.forEach(c => this.setCoinPrice(c.symbol, c.price))
        await Promise.all(coins.map(c => this.coinStorageApi.updatePrice(c.symbol, c.price)))
    }

    @action setCoinPrice = (symbol, price) => {
        this.coinPriceMap[symbol] = price;
    }
 
    @action setLoading = (status) => {
        this.isLoading = status
    }
                                               
    getCoin = (symbol) => {
        return computed(() => {
            const coin = COIN_INFO.find(coin => coin.symbol === symbol)
            const price = this.coinPriceMap[symbol]
            return {...coin, price}
        }).get()
    }
}

export default new CoinPriceStore()
