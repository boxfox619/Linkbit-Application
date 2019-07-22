import AddressStore from './Address/AddressStore'
import CoinPriceStore from './CoinPriceStore'
import TransactionStore from './Transaction/TransactionStore'
import WalletStore from './Wallet/WalletStore'
import SettingStore from './SettingStore'

export const createStore = () => {
  const settingStore = new SettingStore()
  const coinStore = new CoinPriceStore(settingStore)
  const walletStore = new WalletStore(coinStore)
  const addressStore = new AddressStore()
  
  return {
    wallet: walletStore,
    coin: coinStore,
    address: addressStore,
    setting: settingStore,
  }
}

export {
  AddressStore,
  CoinPriceStore,
  TransactionStore,
  WalletStore,
  SettingStore,
}
