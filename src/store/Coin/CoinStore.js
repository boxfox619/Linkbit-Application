import {observable, runInAction} from "mobx";
import CoinApi from "../../api/Coin/CoinApi";

class CoinStore {
    @observable coinList = []
    @observable isLoading = true
    coinApi

    constructor() {
        this.coinApi = CoinApi.create()
    }

    fetchCoins = async () => {
        this.isLoading = true;
        const coins = await this.coinApi.fetchCoinSymbols()
        runInAction(() => {
            this.coinList = coins;
            this.isLoading = false;
        });
    }
}

export default CoinStore