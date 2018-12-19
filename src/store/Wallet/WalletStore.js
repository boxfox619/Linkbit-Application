import { observable, computed, runInAction } from 'mobx'
import WalletApi from '../../api/Wallet/WalletApi'
import Wallet from './Wallet'

class WalletStore {
  @observable wallets = []
  walletApi

  constructor () {
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

  addWallet = async (wallet) => {
    const result = await this.walletApi.createWallet(wallet.asJson())
    if (result) {
      runInAction(() => {
        this.wallets = [...this.wallets, wallet]
      })
    } else {
      //@TODO implement fail create wallet
    }
  }

  @computed get walletList () {
    return this.wallets
  }

  @computed get walletCount () {
    return this.wallets.length
  }
}

export default new WalletStore()
