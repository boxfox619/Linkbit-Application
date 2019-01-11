import {observable, action, computed} from 'mobx'

export default class LinkedAddress {
    @observable linkAddress
    @observable accountAddressMap = {}
    store

    constructor(store, json) {
        this.store = store
        if(!!json){
            this.updateFromJson(json)
        }
    }

    getAccountAddress = (symbol) => {
        return this.accountAddressMap[symbol]
    }

    @computed get asJson() {
        return {
            linkAddress: this.linkAddress,
            accountAddressMap: this.accountAddressMap
        }
    }

    @computed get symbols() {
        return Object.keys(this.accountAddressMap)
    }

    addAddress = async (symbol, address) => {
        if (!this.getAccountAddress(symbol)) {
            return await this.store.addAddress(this.linkAddress, symbol, address)
        }
        return false
    }

    deleteAddress = async (symbol) => {
        if (this.getAccountAddress(symbol)) {
            return await this.store.deleteAddress(this.linkAddress, symbol)
        }
        return false
    }

    @action setAccountAddress = (symbol, address) => {
        if(!!address){
            this.accountAddressMap[symbol] = address
        }else{
            delete this.accountAddressMap[symbol]
        }
    }

    @action updateFromJson(json) {
        this.linkAddress = json.linkAddress.replace(/\"/gi, '')
        this.accountAddressMap = json.accountAddressMap || {}
    }

    @computed get accountAddressList() {
        return Object.values(this.accountAddressMap)
    }

}
