import {observable, computed, runInAction} from 'mobx'
import WalletApi from '../../api/Wallet/WalletApi'
import Wallet from './Wallet'

class WalletStore {
    @observable wallets = []
    walletApi

    constructor() {
      this.walletApi = WalletApi.create()
    }

    loadWalletList = async () => {
      const wallets = await this.walletApi.fetchWallets()
      runInAction(() => {
        this.wallets = wallets.map(json => {
          const wallet = new Wallet()
          wallet.updateFromJson(json)

          return wallet
        })
      })
    }

    createWallet = async (symbol, name, password) => {
      const walletData = await this.walletApi.createWallet(symbol, password)
      runInAction(() => {
        this.wallets = [...this.wallets, {...walletData, name}]
      })
    }

    @computed get walletList() {
      return this.wallets
    }

    @computed get walletCount() {
      return this.wallets.length
    }
}

export default new WalletStore()
