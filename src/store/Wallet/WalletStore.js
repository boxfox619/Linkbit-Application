import {observable, computed, runInAction} from 'mobx'
import Wallet from './Wallet'
import WalletStorageApi from "../../api/Wallet/WalletStorageApi"
import WalletNetworkApi from "../../api/Wallet/WalletNetworkApi"

class WalletStore {
    @observable wallets = []
    walletStorageApi
    walletNetworkApi

    constructor() {
        this.walletStorageApi = new WalletStorageApi()
        this.walletNetworkApi = new WalletNetworkApi()
    }

    loadWalletList = async () => {
        const wallets = await this.walletStorageApi.getWalletList()
        runInAction(() => {
            this.wallets = wallets.map(json => {
                const wallet = new Wallet()
                wallet.updateFromJson(json)
                return wallet
            })
        })
    }

    createWallet = async (symbol, name, password) => {
        const walletData = await this.walletNetworkApi.createWallet(symbol, password)
        const wallet = new Wallet()
        wallet.updateFromJson({...walletData, name, balance: 0, symbol})
        this.walletStorageApi.addWallet(wallet.asJson)
        runInAction(() => {
            this.wallets = [...this.wallets, wallet]
        })
    }

    @computed get walletList() {
        return this.wallets
    }

    @computed get walletCount() {
        return this.wallets.length
    }

    @computed get symbols() {
        const symbols = []
        this.wallets.forEach(w => !symbols.includes(w.symbol) && symbols.push(w.symbol))
        return symbols
    }
}

export default new WalletStore()
