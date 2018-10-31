import {observable, computed, runInAction} from 'mobx';
import AddressApi from '../api/AddressApi';
import LinkedAddress from './LinkedAddress';

class AddressStore {
    @observable linkedAddressList = [];
    addressApi;
    isLoading = false;

    constructor() {
        this.addressApi = new AddressApi();
    }

    loadAddresss() {
        this.isLoading = true;
        this.addressApi.fetchLinkedAddressList().then(addressList => {
            addressList.forEach(json => this.updateAddress(json));
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        });
    }

    updateAddress = (json) => {
        let linkedAddress = this.linkedAddressList.find(linked => linked.address);
        if (!linkedAddress) {
            linkedAddress = new LinkedAddress();
        }
        linkedAddress.updateFromJson(json)
    }

    @computed getLinkedAddress(symbol, accountAddress) {
        let linkedAddressList = this.linkedAddressList.filter(linked => linked.getAccountAddress(symbol) === accountAddress);
        return linkedAddressList;
    }


}