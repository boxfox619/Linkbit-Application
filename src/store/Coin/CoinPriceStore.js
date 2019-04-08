import {observable, computed, runInAction, action} from 'mobx'
import Coin from './Coin'
import CoinNetworkApi from './../../api/Coin/CoinNetworkApi'
import CoinStorageApi from './../../api/Coin/CoinStorageApi'
import SettingStore from '../SettingStore'
import { handleError } from '../../libs/ErrorHandler'

class CoinPriceStore {
    @observable coinList = []
    @observable isLoading = false
    coinNetworkApi
    coinStorageApi

    constructor() {
        this.coinNetworkApi = new CoinNetworkApi()
        this.coinStorageApi = new CoinStorageApi()
    }

    loadCoins = async () => {
        const savedCoinList = await this.coinStorageApi.getCoins()
        runInAction(() => {
            this.coinList = savedCoinList.map(c => {
                const coin = new Coin(c.symbol)
                coin.updateFromJson(c)
                return coin
            })
        })
        await this.refreshCoins()
    }

    refreshCoins = async () => {
        this.setLoading(true)
        const symbols = this.coinList.map(coin => coin.symbol)
        const coins = await this.coinNetworkApi.fetchCoinPrices(symbols, SettingStore.currency)
        coins.forEach(json => this.updateCoinPrice(json))
        this.setLoading(false)
        await this.coinStorageApi.updateCoins(coins)
    }

    loadCoin = async (symbol) => {
        this.setLoading(true)
        try {
            const coins = await this.coinNetworkApi.fetchCoinPrices([symbol], SettingStore.currency)
            coins.forEach(json => this.updateCoinPrice(json))
            this.setLoading(false)
            await this.coinStorageApi.updateCoin(coins.find(c => c.symbol === symbol))
        } catch (e) {
            handleError(e)
        }
    }

    @action setLoading = (status) => {
        this.isLoading = status
    }

    @action addCoin = (coin) => {
        this.coinList.push(coin)
    }

    @action updateCoinPrice = (json) => {
        let coin = this.coinList.find(coin => coin.symbol === json.symbol)
        if (!coin) {
            coin = new Coin(json.symbol)
            this.addCoin(coin)
        }
        coin.updateFromJson(json)
    }

    @computed get coinLists() {
        return this.coinList
    }

    getCoin = (symbol) => {
        return computed(() => {
            let coin = this.coinList.find(coin => coin.symbol === symbol)
            if (!coin) {
                coin = new Coin(symbol)
                this.addCoin(coin)
                this.loadCoin(symbol)
            }
            return coin
        }).get()
    }
}

export default new CoinPriceStore()
