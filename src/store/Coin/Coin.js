import {observable, action, computed} from 'mobx'

export default class Coin{
    @observable symbol = '';
    @observable price = 0;
    @observable name = '';

    constructor(symbol){
      this.symbol = symbol
    }

    @computed get asJson(){
      return {
        symbol: this.symbol,
        price: this.price,
        name: this.name,
      }
    }

    @action updateFromJson = (json) => {
      this.price = json.price
      this.name = json.name
    }
}