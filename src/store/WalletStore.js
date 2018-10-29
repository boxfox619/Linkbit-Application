import WalletApi from '../api/WalletApi';
import Wallet from './Wallet';
import {observable, computed, runInAction} from 'mobx';

class WalletStore {
    @observable wallets = [];

    constructor() {
        this.walletApi = new WalletApi();
    }

    fetchWallets = async () => {
        const wallets = await this.walletApi.fetchWallets();
        runInAction(() => {
            this.wallets = wallets.map(json => {
                let wallet = new Wallet();
                wallet.updateFromJson(json);
                return wallet;
            });
        });
    }

    addWallet = async (wallet) => {
        const result = await this.walletApi.createWallet(wallet.asJson());
        if(result){
            runInAction(() => {
                this.wallets = [...this.wallets, wallet]
            })
        }else{
            //@TODO implement fail create wallet
        }
    }

    @computed
    walletCount = () => this.wallets.length
}

export default new WalletStore();