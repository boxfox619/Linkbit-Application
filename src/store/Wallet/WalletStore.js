import {observable, computed, runInAction} from 'mobx'
import Wallet from './Wallet'
import WalletStorageApi from "../../api/Wallet/WalletStorageApi"
import CoinPriceStore from '../Coin/CoinPriceStore'
import {fixed} from '../../libs/NumberFormatter'
import { handleError } from '../../libs/ErrorHandler'
import walletManager from '../../libs/wallet'
import { createWeb3 } from '../../libs/Web3'

class WalletStore {
    @observable wallets = []
    walletStorageApi
    web3

    constructor() {
        this.walletStorageApi = new WalletStorageApi()
        this.web3 = createWeb3()
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
        await this.loadAllBalance()
    }

    loadAllBalance = async () => {
        for(const i in this.wallets){
            const wallet = this.wallets[i]
            try {
                const balanceWei = await this.web3.eth.getBalance(wallet.address)
                const balance = this.web3.utils.fromWei(balanceWei, 'ether')
                wallet.balance = balance
            }catch(err){
                handleError(err)
            }
        }
        await this.walletStorageApi.saveWalletList(this.wallets.map(w => w.asJson))
    }

    createNewWallet = async (symbol, name, password) => {
        const walletData = this.createNewWallet(symbol, password)
        CoinPriceStore.loadCoin(symbol)
        return await this.addWalletData(symbol, name, walletData)
    }

    createWallet = async (symbol, password) => walletManager[symbol].create(password)

    getWallet(address) {
        return this.wallets.find(w => w.address === address)
    }

    importWallet = async (symbol, name, type, data) => {
        const walletData = await walletManager[symbol].import(type, data)
        return await this.addWalletData(symbol, name, walletData)
    }

    addWalletData = async (symbol, name, walletData) => {
        const wallet = new Wallet()
        wallet.updateFromJson({...walletData, name, balance: 0, symbol})
        await this.walletStorageApi.addWallet(wallet.asJson)
        runInAction(() => {
            this.wallets = [...this.wallets, wallet]
        })
        return wallet
    }

    @computed get totalPrice() {
        let totalPrice = 0
        this.wallets.forEach(w => {
            const coin = CoinPriceStore.getCoin(w.symbol)
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
