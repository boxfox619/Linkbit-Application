import {observable, computed, action} from 'mobx'

export default class Wallet {
    @observable address
    @observable name
    @observable balance = 0
    @observable symbol
    @observable privateKey

    @action setName(name) {
        this.name = name
    }

    @computed get asJson() {
        return {
            address: this.address,
            name: this.name,
            balance: this.balance,
            symbol: this.symbol,
            privateKey: this.privateKey
        }
    }

    updateFromJson(json) {
        this.address = json.address
        this.name = json.name
        this.balance = json.balance
        this.symbol = json.symbol
        this.privateKey = json.privateKey
    }
}
