import {observable, computed, runInAction} from 'mobx';
import CoinApi from '../api/CoinApi';
import Coin from './Coin';

class CoinStore {
    @observable coinList = [];
    @observable isLoading = false;
    coinApi;

    constructor(){
        this.coinApi = new CoinApi();
    }

    loadPrices() {
        this.isLoading = true;
        this.coinApi.fetchCoinPrices(this.coinList.map(coin => coin.symbol)).then(coins => {
            coins.forEach(json => this.updateCoinPrice(json));
            this.isLoading = false;
        });
    }

    loadPrice(symbol){
        this.isLoading = true;
        this.coinApi.fetchCoinPrices([symbol]).then(coins => {
            coins.forEach(json => this.updateCoinPrice(json));
            this.isLoading = false;
        });
    }

    updateCoinPrice(json) {
        var coin = this.coinList.find(coin => coin.symbol === coin.symbol);
        if (!coin) {
            coin = new Coin(json.symbol);
            coin.updateFromJson(coin);
            this.coinList.push(coin);
        }else {
            coin.updateFromJson(json);
        }
    }

    @computed getCoinPrice = (symbol) => {
        let coin = this.coinList.find(coin => coin.symbol === symbol);
        if(!coin){
            coin = new Coin(symbol);
            this.coinList.push(coin);
            this.loadPrice(symbol);
        }
        return coin.price;
    }
}