import { observable, action, computed } from 'mobx'
import Wallet from './Wallet'
import WalletStorageApi from "../../api/WalletStorageApi"
import coinPriceStore from '../Coin/CoinPriceStore'
import { fixed } from '../../libs/NumberFormatter'
import { handleError } from '../../libs/ErrorHandler'
import walletManager from '../../libs/wallet'

class WalletStore {
    @observable wallets = []
    walletStorageApi

    constructor() {
        this.walletStorageApi = new WalletStorageApi()
    }

    loadWalletList = async () => {
        const wallets = await this.walletStorageApi.getWalletList()
        const walletList = wallets.map(json => {
            const wallet = new Wallet()
            wallet.updateFromJson(json)
            return wallet
        })
        this.setWalletList(walletList)
        await this.loadAllBalance()
    }

    loadAllBalance = async () => {
        const promiseList = this.wallets.map(async (wallet) => {
            try {
                const balance = await walletManager[wallet.symbol].getBalance(wallet.address)
                wallet.balance = balance
            } catch (err) {
                handleError(err)
            }
        });
        await Promise.all(promiseList)
        await this.walletStorageApi.saveWalletList(this.wallets.map(w => w.asJson))
    }

    createNewWallet = async (symbol, name, password) => {
        const walletData = await this.createWallet(symbol, password)
        coinPriceStore.refreshCoinPrice(symbol)
        return await this.addWallet(symbol, name, walletData)
    }

    createWallet = async (symbol, password) => walletManager[symbol].create(password)

    getWallet(address) {
        return this.wallets.find(w => w.address === address)
    }

    importWallet = async (symbol, name, type, data) => {
        const walletData = await walletManager[symbol].import(type, data)
        return await this.addWallet(symbol, name, walletData)
    }

    addWallet = async (symbol, name, walletData) => {
        const wallet = new Wallet()
        wallet.updateFromJson({ ...walletData, name, balance: 0, symbol })
        if (!!this.walletList.find(w => w.address === wallet.address)) {
            throw new Error('already imported wallet');
        }
        await this.walletStorageApi.addWallet(wallet.asJson)
        this.setWalletList([...this.wallets, wallet])
        return wallet
    }

    deleteWallet = async (wallet) => {
        await this.walletStorageApi.removeWallet(wallet.symbol, wallet.address)
        await this.loadWalletList()
    }

    @action setWalletList(walletList) {
        this.wallets = walletList.filter(w => !!w.address)
    }

    @computed get totalPrice() {
        let totalPrice = 0
        this.wallets.forEach(w => {
            const coin = coinPriceStore.getCoin(w.symbol)
            totalPrice += w.balance * coin.price
        })
        return fixed(totalPrice, 3)
    }

    @computed get walletList() {
        return this.wallets
    }

    @computed get walletCount() {
        return this.wallets.length
    }
}

export default new WalletStore()
