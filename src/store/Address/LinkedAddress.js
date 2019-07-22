import { observable, action, computed } from 'mobx'

export default class LinkedAddress {
    ownAddress
    @observable linkaddress
    @observable accountAddressMap = {}
    store

    constructor(store, json) {
      this.store = store
      if (json) {
        this.updateFromJson(json)
      }
    }

    getAccountAddress = (symbol) => {
      return this.accountAddressMap[symbol]
    }

    @computed get asJson() {
      return {
        ownAddress: this.ownAddress,
        linkaddress: this.linkaddress,
        accountAddressMap: this.accountAddressMap,
      }
    }

    @computed get symbols() {
      return Object.keys(this.accountAddressMap)
    }

    linkAddress = async (symbol, address) => {
      if (!this.getAccountAddress(symbol)) {
        return await this.store.linkAddress(this.linkaddress, symbol, address)
      }
      
      return false
    }

    unlinkAddress = async (symbol) => {
      if (this.getAccountAddress(symbol)) {
        return await this.store.unlinkAddress(this.linkaddress, symbol)
      }
      
      return false
    }

    deleteAddress = async () => {
      return await this.store.deleteAddress(this.linkaddress)
    }

    @action setAccountAddress = (symbol, address) => {
      if (address) {
        this.accountAddressMap[symbol] = address
      } else {
        delete this.accountAddressMap[symbol]
      }
    }

    @action updateFromJson(json) {
      this.ownAddress = json.ownAddress
      this.linkaddress = json.linkaddress
      this.accountAddressMap = json.accountAddressMap || {}
    }

    @computed get accountAddressList() {
      return Object.values(this.accountAddressMap)
    }

}
