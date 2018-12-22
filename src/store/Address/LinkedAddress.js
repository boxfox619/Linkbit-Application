import { observable, action, computed } from 'mobx'
import WalletStore from '../Wallet/WalletStore'

export default class LinkedAddress {
  @observable address
  @observable accountAddressList = []

  @computed get asJson () {
    return {
      address: this.address,
      accountAddressList: this.accountAddressList,
    }
  }

  getAccountAddress = (symbol) => {
    return this.accountAddressList.find(account => account.symbol === symbol)
  }

  @action addAddress (symbol, address) {
    if (!this.getAccountAddress(symbol)) {
      this.accountAddressList.push({symbol, address})
    }
  }

  @action deleteAddress (symbol, address) {
    if (this.getAccountAddress(symbol)) {
      this.accountAddressList.splice(this.accountAddressList.indexOf(address), 1)
    }
  }

  @action updateFromJson (json) {
    this.address = json.address
    this.accountAddressList = json.accountAddressList
  }

}
