import {observable, computed, runInAction, action} from 'mobx'
import Coin from './Coin'
import CoinNetworkApi from './../../api/Coin/CoinNetworkApi'
import CoinStorageApi from './../../api/Coin/CoinStorageApi'

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
                coin.updateFromJson(C)
                return coin
            })
        })
        await this.refreshCoins()
    }

    refreshCoins = async () => {
        this.isLoading = true
        const symbols = this.coinList.map(coin => coin.symbol)
        const coins = await this.coinNetworkApi.fetchCoinPrices(symbols)
        runInAction(() => {
            coins.forEach(json => this.updateCoinPrice(json))
            this.isLoading = false
        })
        await this.coinStorageApi.updateCoins(coins)
    }

    loadCoin = async (symbol) => {
        this.isLoading = true
        try {
            const coins = await this.coinNetworkApi.fetchCoinPrices([symbol])
            runInAction(() => {
                coins.forEach(json => this.updateCoinPrice(json))
                this.isLoading = false
            })
            await this.coinStorageApi.updateCoin(coins.find(c => c.symbol === symbol))
        } catch (e) {
            alert(e)
        }
    }

    @action updateCoinPrice(json) {
        let coin = this.coinList.find(coin => coin.symbol === json.symbol)
        if (!coin) {
            coin = new Coin(json.symbol)
            this.coinList.push(coin)
        }
        coin.updateFromJson(json)
    }

    @computed get coinLists() {
        return this.coinList
    }

    getCoin(symbol) {
        let coin = this.coinList.find(coin => coin.symbol === symbol)
        if (!coin) {
            runInAction(() => {
                coin = new Coin(symbol)
                this.coinList.push(coin)
                this.loadCoin(symbol)
            })
        }

        return coin
    }
}

export default new CoinPriceStore()
