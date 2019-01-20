import {observable, computed, runInAction} from 'mobx'
import Wallet from './Wallet'
import WalletStorageApi from "../../api/Wallet/WalletStorageApi"
import WalletNetworkApi from "../../api/Wallet/WalletNetworkApi"
import CoinPriceStore from '../Coin/CoinPriceStore'

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
        await this.addWalletData(symbol, name, walletData)
    }

    getWallet(address) {
        return this.wallets.find(w => w.address === address)
    }

    importWallet = async (symbol, name, data) => {
        const walletData = await this.walletNetworkApi.importWallet(symbol, data)
        await this.addWalletData(symbol, name, walletData)
    }

    addWalletData = async (symbol, name, walletData) => {
        const wallet = new Wallet()
        wallet.updateFromJson({...walletData, name, balance: 0, symbol})
        this.walletStorageApi.addWallet(wallet.asJson)
        runInAction(() => {
            this.wallets = [...this.wallets, wallet]
        })
        await CoinPriceStore.loadCoin(symbol)
    }

    @computed get totalPrice() {
        let totalPrice = 0
        this.wallets.forEach(w => {
            const coin = CoinPriceStore.getCoin(w.symbol)
            totalPrice += w.balance * coin.price
        })
        return totalPrice
    }

    @computed get walletList() {
        return this.wallets
    }

    @computed get walletCount() {
        return this.wallets.length
    }
}

export default new WalletStore()
