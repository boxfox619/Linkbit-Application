import { observable, computed, action, reaction } from 'mobx'
import { Alert } from 'react-native'
import CoinNetworkApi from '../api/Coin/CoinNetworkApi'
import CoinStorageApi from '../api/Coin/CoinStorageApi'
import i18n from '../libs/Locale'
import { COIN_INFO } from '../libs/Constraints'

class CoinPriceStore {
  @observable isLoading = false
  coinNetworkApi
  coinStorageApi

  constructor(settingStore) {
    this.settingStore = settingStore
    this.coinNetworkApi = new CoinNetworkApi()
    this.coinStorageApi = new CoinStorageApi()
    reaction(
      () => settingStore.currency,
      async () => this.refreshCoinPrices(),
    )
  }

  load = async () => {
    await this.coinStorageApi.load()
    try {
      await this.refreshCoinPrices()
    } catch (err) {
      Alert.alert(i18n.t('please_check_network'))
    }
  }

  refreshCoinPrices = async () => {
    for (const coin of COIN_INFO) {
      const price = await this.coinNetworkApi.fetchCoinPrice(coin.name, this.settingStore.currency)
      this.setCoinPrice(coin.symbol, price)
      await this.coinStorageApi.updatePrice(coin.symbol, price)
    }
  }

  refreshCoinPrice = async (symbol) => {
    const coin = COIN_INFO.find(c => c.symbol = symbol)
    if (!coin) {
      return
    }
    const price = await this.coinNetworkApi.fetchCoinPrice(coin.name, this.settingStore.currency)
    this.setCoinPrice(symbol, price)
    this.coinStorageApi.updatePrice(symbol, price)
  }

  @action setCoinPrice = (symbol, price) => {
    this.coinPriceMap = { ...this.coinPriceMap, [symbol]: price }
  }

  @action setLoading = (status) => {
    this.isLoading = status
  }

  getCoin = (symbol) => {
    return computed(() => {
      const coin = COIN_INFO.find(c => c.symbol === symbol)
      const price = this.coinStorageApi.getPrice(symbol) || 0

      return { ...coin, price }
    }).get()
  }
}

export default CoinPriceStore
