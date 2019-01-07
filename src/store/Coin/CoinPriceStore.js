import {observable, computed, runInAction, action} from 'mobx'
import Coin from './Coin'
import CoinNetworkApi from './../../api/Coin/CoinNetworkApi';

class CoinPriceStore {
    @observable coinList = []
    @observable isLoading = false
    coinNetworkApi

    constructor() {
        this.coinNetworkApi = new CoinNetworkApi()
    }

    loadCoins = async(symbols) => {
        runInAction(() => {
            symbols.forEach(symbol => this.coinList.push(new Coin(symbol)))
        })
        await this.refreshCoins()
    }

    refreshCoins = async () => {
        this.isLoading = true
        const coins = await this.coinNetworkApi.fetchCoins(this.coinList.map(coin => coin.symbol))
        alert(coins)
        runInAction(() => {
            coins.forEach(json => this.updateCoinPrice(json))
            this.isLoading = false
        })
    }

    loadCoin = async (symbol) => {
        this.isLoading = true
        const coins = await this.coinNetworkApi.fetchCoins([symbol])
        runInAction(() => {
            coins.forEach(json => this.updateCoinPrice(json))
            this.isLoading = false
        })
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
