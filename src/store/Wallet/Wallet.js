import {observable, computed, action, reaction} from 'mobx'

export default class Wallet {
    @observable address
    @observable linkedAddress
    @observable name
    @observable balance
    @observable symbol
    @observable walletFileName
    @observable walletData

    @action setName(name) {
        this.name = name
    }

    @computed get asJson() {
        return {
            address: this.address,
            linkedAddress: this.linkedAddress,
            name: this.name,
            balance: this.balance,
            symbol: this.symbol,
            walletFileName: this.walletFileName,
            walletData: this.walletData
        }
    }

    updateFromJson(json) {
        this.address = json.address
        this.linkedAddress = json.linkedAddress
        this.name = json.name
        this.balance = json.balance
        this.symbol = json.symbol
        this.walletFileName = json.walletFileName
        this.walletData = json.walletData
    }
}
