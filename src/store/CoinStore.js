import {observable, computed, runInAction} from 'mobx';
import CoinApi from '../api/Coin/CoinApi';
import Coin from './Coin';

class CoinStore {
    @observable coinList = [];
    @observable isLoading = false;
    coinApi;

    constructor() {
        this.coinApi = CoinApi.create();
    }

    loadCoins(symbols) {
        runInAction(() => {
            symbols.forEach(symbol => this.coinList.push(new Coin(symbol)));
        });
        this.refreshCoins();
    }

    refreshCoins = async () => {
        this.isLoading = true;
        this.coinApi.fetchCoinPrices(this.coinList.map(coin => coin.symbol)).then(coins => {
            runInAction(() => {
                coins.forEach(json => this.updateCoinPrice(json));
                this.isLoading = false;
            });
        });
    }

    loadCoin = async (symbol) => {
        this.isLoading = true;
        this.coinApi.fetchCoinPrices([symbol]).then(coins => {
            runInAction(() => {
                coins.forEach(json => this.updateCoinPrice(json));
                this.isLoading = false;
            });
        });
    }

    updateCoinPrice(json) {
        var coin = this.coinList.find(coin => coin.symbol === coin.symbol);
        if (!coin) {
            coin = new Coin(json.symbol);
            coin.updateFromJson(coin);
            this.coinList.push(coin);
        } else {
            coin.updateFromJson(json);
        }
    }

    @computed get coinLists() {
        return this.coinList;
    }

    getCoin(symbol) {
        return computed(() => {
            let coin = this.coinList.find(coin => coin.symbol === symbol);
            runInAction(() => {
                if (!coin) {
                    coin = new Coin(symbol);
                    this.coinList.push(coin);
                    this.loadCoin(symbol);
                }
            });
            return coin;
        }).get();
    }
}

export default new CoinStore();