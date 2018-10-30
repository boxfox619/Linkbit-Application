import {observable, computed, runInAction, reaction} from 'mobx';

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

    @computed get asJson() {
        return {
            address: this.address,
            linkedAddress: this.linkedAddress,
            name: this.name,
            balance: this.balance,
            major: this.major,
            open: this.open
        };
    }

    updateFromJson(json) {
        this.address = json.address;
        this.linkedAddress = json.linkedAddress;
        this.name = json.name;
        this.balance = json.balance;
        this.symbol = json.symbol;
        this.major = json.major;
        this.open = json.open;
    }
}