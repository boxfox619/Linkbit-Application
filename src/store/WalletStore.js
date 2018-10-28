import WalletApi from '../api/WalletApi';
import {observable, computed, runInAction} from 'mobx';

class WalletStore {
    @observable wallets = [];

    constructor(walletApi) {
        this.walletApi = walletApi;
    }

    fetchWallets = async () => {
        const wallets = await this.walletApi.fetchWallets();
        runInAction(() => {
            this.wallets = wallets;
        });
    }

    @computed
    walletCount = () => this.wallets.length
}

export default new WalletStore(new WalletApi());