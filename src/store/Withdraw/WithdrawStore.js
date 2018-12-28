import {observable, action, computed, runInAction} from 'mobx'
import WalletStore from "../Wallet/WalletStore";
import TransactionStore from "../Transaction/TransactionStore";
import WithdrawNetworkApi from "../../api/Withdraw/WithdrawNetworkApi";

export default class WithdrawStore {
    @observable symbol
    @observable sourceAddress
    @observable destAddress
    @observable amount
    walletStore
    transactionStore
    withdrawApi
    //@TODO Impl withdraw api

    constructor() {
        this.withdrawApi = new WithdrawNetworkApi()
        this.walletStore = WalletStore
    }

    @action setSoruceWallet(symbol, address) {
        this.symbol = symbol
        this.sourceAddress = address
    }

    @action setTargetAddress(address) {
        this.destAddress = address
    }

    @action setAmount(amount){
        this.amount = amount
    }

    withdraw = async (password) => {
        const wallet = this.walletStore.walletList.filter(w => w.address === this.sourceAddress || w.linkedAddress === this.sourceAddress)
        this.transactionStore = new TransactionStore(this.symbol, this.sourceAddress)
        const resTransaction = this.withdrawApi.withdraw(wallet, password, this.amount, this.destAddress)
        this.transactionStore.fetchTransaction(resTransaction)
    }
}