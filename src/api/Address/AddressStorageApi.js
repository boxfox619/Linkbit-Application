import {AsyncStorage} from 'react-native';

const ADDRESS_STORAGE_KEY = "address";

export default class AddressStorageApi {
    addressList = []

    getAddressList = async () => {
        if(!this.addressList || this.addressList.length === 0){
            await this.loadAddressList();
        }
        return this.addressList
    }

    updateAddress = async (addressData) => {
        const addressList = await this.getAddressList();
        const idx = addressList.findIndex(address => (address.address === addressData.address));
        addressList.splice(idx, 1, addressData);
        await this.saveAddressList(addressList);
    }

    addAddress = async (addressData) => {
        const addressList = await this.getAddressList();
        addressList.push(addressData);
        await this.saveAddressList(addressList);
    }

    removeAddress = async (linkAddress) => {
        const addressList = await this.getAddressList();
        const idx = addressList.findIndex(address => (address.address === linkAddress));
        addressList.splice(idx, 1);
        await this.saveAddressList(addressList);
    }

    saveAddressList = async (addressList) => {
        this.addressList = addressList
        AsyncStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addressList));
    }

    loadAddressList = async () => {
        const addressList = await AsyncStorage.getItem(ADDRESS_STORAGE_KEY) || '[]'
        this.addressList = JSON.parse(addressList)
    }
}