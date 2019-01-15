import {observable, runInAction} from "mobx";
import CoinNetworkApi from "../../api/Coin/CoinNetworkApi";

class CoinStore {
    @observable coinList = []
    @observable isLoading = true
    coinNetworkApi

    constructor() {
        this.coinNetworkApi = new CoinNetworkApi()
    }

    fetchCoins = async () => {
        this.isLoading = true;
        const coins = await this.coinNetworkApi.fetchCoins()
        runInAction(() => {
            this.coinList = coins;
            this.isLoading = false;
        });
    }
}

export default CoinStore