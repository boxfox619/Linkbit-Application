import {observable, action, computed} from 'mobx'
import WalletStore from "../Wallet/WalletStore";
import TransactionStore from "../Transaction/TransactionStore";
import WithdrawNetworkApi from "../../api/Withdraw/WithdrawNetworkApi";
import CoinPriceStore from '../Coin/CoinPriceStore'
import AddressNetworkApi from "../../api/Address/AddressNetworkApi";

export default class WithdrawStore {
    @observable symbol
    @observable sourceAddress
    @observable destAddress
    @observable amount = 0
    @observable price = 0
    @observable moneySymbol
    @observable destAddressError
    transactionStore
    withdrawApi
    addressApi

    constructor() {
        this.withdrawApi = new WithdrawNetworkApi()
        this.addressApi = new AddressNetworkApi()
    }

    @action setSoruceWallet(symbol, address) {
        this.symbol = symbol
        this.sourceAddress = address
    }

    @action setTargetAddress(address) {
        this.destAddress = address
        if (address.length === 0) {
            this.destAddressError = 'Please enter dest address'
            return
        }
        this.addressApi.checkAddressValid(address).then(res => {
            this.destAddressError = undefined;
        }).catch(err => this.destAddressError = 'address is not valid')
    }

    @action setAmount(amount) {
        this.amount = amount
        this.price = this.coinPrice * amount
    }

    @action setMoneySymbol(symbol) {
        this.moneySymbol = symbol
    }

    @action setPrice(price) {
        this.price = price
        this.amount = price / this.coinPrice
    }

    @computed get coinPrice() {
        return CoinPriceStore.getCoin(this.symbol).price
    }

    @computed get amountError() {
        const value = parseFloat(this.amount)
        if (isNaN(value) || value <= 0) {
            return 'Please enter valid amount'
        }
    }

    withdraw = async (password) => {
        const wallet = WalletStore.walletList.filter(w => w.address === this.sourceAddress || w.linkedAddress === this.sourceAddress)
        this.transactionStore = new TransactionStore(this.symbol, this.sourceAddress)
        const resTransaction = this.withdrawApi.withdraw(wallet, password, this.amount, this.destAddress)
        this.transactionStore.fetchTransaction(resTransaction)
    }
}