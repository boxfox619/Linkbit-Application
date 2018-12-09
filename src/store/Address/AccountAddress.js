import {observable, action} from 'mobx'

export default class Address {
    @observable address
    @observable symbol

    @computed get asJson() {
      return {
        address: this.address,
        symbol: this.symbol,
      }
    }

    updateFromJson(json) {
      this.address = json.address
      this.symbol = json.symbol
    }

    @action set address(address) {
      this.address = address
    }
}