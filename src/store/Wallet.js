import {observable, computed, action, reaction} from 'mobx';

export default class Wallet {
    @observable address;
    @observable linkedAddress;
    @observable name;
    @observable balance;
    @observable symbol;

    updateWallet = null;
    store;

    constructor(store) {
        this.store = store;
        this.updateWallet = reaction(
            () => this.asJson,
            (json) => {
                this.store.walletApi.updateWallet(json);
            }
        );
    }

    @action setName(name){
        this.name = name;
    }

    @computed get asJson() {
        return {
            address: this.address,
            linkedAddress: this.linkedAddress,
            name: this.name,
            balance: this.balance,
            symbol: this.symbol
        };
    }

    updateFromJson(json) {
        this.address = json.address;
        this.linkedAddress = json.linkedAddress;
        this.name = json.name;
        this.balance = json.balance;
        this.symbol = json.symbol;
    }
}