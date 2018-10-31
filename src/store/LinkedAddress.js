import {observable, action, computed} from 'mobx';

export default class LinkedAddress {
    @observable address;
    @observable accountAddressList = [];

    @computed get asJson() {
        return {
            address: this.address,
            accountAddressList: this.accountAddressList
        };
    }

    @computed getAccountAddress(symbol){
        return this.accountAddressList.find(account => account.symbol === symbol);
    }

    @action addAddress(symbol, address) {
        if (!this.getAccountAddress(symbol)) {
            this.accountAddressList.push(address);
        }
    }

    updateFromJson(json) {
        this.address = json.address;
        this.accountAddressList = json.accountAddressList;
    }

}