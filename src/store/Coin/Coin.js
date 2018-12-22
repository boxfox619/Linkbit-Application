import {observable, action, computed} from 'mobx'

export default class Coin {
    symbol = ''
    @observable name = ''
    @observable themeColor = ''
    @observable price = 0

    constructor(symbol) {
      this.symbol = symbol
    }

    @computed get asJson() {
      return {
        symbol: this.symbol,
        price: this.price,
        name: this.name,
      }
    }

    @action updateFromJson = (json) => {
      this.price = json.price
      this.name = json.name
      this.themeColor = json.themeColor
    }
}
