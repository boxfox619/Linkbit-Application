import {observable, action, computed} from 'mobx'

export default class LinkedAddress {
    @observable linkAddress
    @observable accountAddressMap = {}

    constructor(json) {
        if(!!json){
            this.updateFromJson(json)
        }
    }

    @computed get asJson() {
        return {
            address: this.address,
            accountAddressList: this.accountAddressList,
        }
    }

    getAccountAddress = (symbol) => {
        return this.accountAddressList.find(account => account.symbol === symbol)
    }

    @action addAddress(symbol, address) {
        if (!this.getAccountAddress(symbol)) {
            this.accountAddressList.push({symbol, address})
        }
    }

    @action deleteAddress(symbol, address) {
        if (this.getAccountAddress(symbol)) {
            this.accountAddressList.splice(this.accountAddressList.indexOf(address), 1)
        }
    }

    @action updateFromJson(json) {
        this.linkAddress = json.linkAddress
        this.accountAddressMap = json.accountAddressMap || {}
    }

    @computed get accountAddressList() {
        return Object.values(this.accountAddressMap)
    }

    @computed get address() {
        return this.linkAddress
    }

}
