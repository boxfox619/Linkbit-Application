import { observable, computed, action } from 'mobx'
import CoinNetworkApi from './../../api/Coin/CoinNetworkApi'
import CoinStorageApi from './../../api/Coin/CoinStorageApi'
import SettingStore from '../SettingStore'
import { COIN_INFO } from '../../libs/Constraints';

class CoinPriceStore {
    @observable isLoading = false
    coinNetworkApi
    coinStorageApi

    constructor() {
        this.coinNetworkApi = new CoinNetworkApi()
        this.coinStorageApi = new CoinStorageApi()
    }

    load = async () => {
        await this.coinStorageApi.load()
        await this.refreshCoinPrices()
    }

    refreshCoinPrices = async () => {
        for (coin of COIN_INFO) {
            const price = await this.coinNetworkApi.fetchCoinPrice(coin.name, SettingStore.currency)
            this.setCoinPrice(coin.symbol, price)
            await this.coinStorageApi.updatePrice(coin.symbol, price)
        }
    }

    refreshCoinPrice = async (symbol) => {
        const coin = COIN_INFO.find(c => c.symbol = symbol);
        if (!coin) {
            return
        }
        const price = await this.coinNetworkApi.fetchCoinPrice(coin.name, SettingStore.currency);
        this.setCoinPrice(symbol, price)
        this.coinStorageApi.updatePrice(symbol, price)
    }

    @action setCoinPrice = (symbol, price) => {
        this.coinPriceMap = { ...this.coinPriceMap, [symbol]: price };
    }

    @action setLoading = (status) => {
        this.isLoading = status
    }

    getCoin = (symbol) => {
        return computed(() => {
            const coin = COIN_INFO.find(coin => coin.symbol === symbol)
            const price = this.coinStorageApi.getPrice(symbol) || 0
            return { ...coin, price }
        }).get()
    }
}

export default new CoinPriceStore()
