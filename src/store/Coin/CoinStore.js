import { observable, computed, runInAction, action } from 'mobx'
import CoinApi from '../../api/Coin/CoinApi'
import Coin from './Coin'

class CoinStore {
  @observable coinList = []
    @observable isLoading = false
    coinApi

    constructor() {
        this.coinApi = CoinApi.create()
    }

    loadCoins(symbols) {
        runInAction(() => {
            symbols.forEach(symbol => this.coinList.push(new Coin(symbol)))
        })
        this.refreshCoins()
    }

    refreshCoins = async () => {
        this.isLoading = true
        const coins = await this.coinApi.fetchCoins(this.coinList.map(coin => coin.symbol))
        runInAction(() => {
            coins.forEach(json => this.updateCoinPrice(json))
            this.isLoading = false
        })
    }

    loadCoin = async (symbol) => {
        this.isLoading = true
        const coins = await this.coinApi.fetchCoins([symbol])
        runInAction(() => {
            coins.forEach(json => this.updateCoinPrice(json))
            this.isLoading = false
        })
    }

  @action updateCoinPrice (json) {
    let coin = this.coinList.find(coin => coin.symbol === json.symbol)
    if (!coin) {
      coin = new Coin(json.symbol)
      this.coinList.push(coin)
    }
    coin.updateFromJson(json)
  }

  @computed get coinLists () {
    return this.coinList
  }

  getCoin (symbol) {
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

export default new CoinStore()
