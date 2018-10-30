import {observable} from 'mobx';

export default class Coin{
    @observable symbol;
    @observable price;
    @observable name;

    constructor(symbol){
        this.symbol = symbol;
    }

    asJson(){
        return {
            symbol: this.symbol,
            price: this.price,
            name: this.name
        }
    }

    updateFromJson = (json) => {
        this.price = json.price;
        this.name = json.name;
    }
}