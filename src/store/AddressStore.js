import {observable, computed, runInAction} from 'mobx';
import AddressApi from '../api/Address/AddressApi';
import LinkedAddress from './LinkedAddress';

class AddressStore {
    @observable linkedAddressList = [];
    addressApi;
    isLoading = false;

    constructor() {
        this.addressApi = AddressApi.create();
    }

    loadAddressList = async () => {
        this.isLoading = true;
        const addressList = await this.addressApi.fetchOwnAddressList();
        runInAction(() => {
            addressList.forEach(json => this.updateAddress(json));
            this.isLoading = false;
        });
    };

    updateAddress = (json) => {
        let linkedAddress = this.linkedAddressList.find(linked => linked.address===json.address);
        if (!linkedAddress) {
            linkedAddress = new LinkedAddress();
            this.linkedAddressList = [...this.linkedAddressList, linkedAddress];
        }
        linkedAddress.updateFromJson(json)
    };

    getLinkedAddress = (symbol, accountAddress) => {
        let linkedAddressList = this.linkedAddressList.filter(linked => linked.getAccountAddress(symbol) === accountAddress);
        return linkedAddressList;
    }
}

export default new AddressStore();