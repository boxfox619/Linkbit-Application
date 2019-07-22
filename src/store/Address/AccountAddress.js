import { observable, computed } from 'mobx'

export default class Address {
  @observable address
  @observable symbol

  constructor(address, symbol) {
    this.address = address
    this.symbol = symbol
  }

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

}
