import {observable, action, computed} from 'mobx'
import AddressStore from './AddressStore'
import AddressNetworkApi from "../../api/Address/AddressNetworkApi"
import AddressStorageApi from "../../api/Address/AddressStorageApi"

export default class AddressBuyStore {
    @observable linkAddress = ''
    addressNetworkApi
    addressStorageApi
    @observable isProcessing = false

    constructor() {
        this.addressNetworkApi = new AddressNetworkApi()
        this.addressStorageApi = new AddressStorageApi()
    }

    getNewAddress = async () => {
        this.isProcessing = true
        const res = await this.addressNetworkApi.buyAddress(this.linkAddress)
        await AddressStore.updateAddress(res)
        this.isProcessing = false
    }

    @action setAddress = (address) => {
        this.linkAddress = address
    }

    @computed get error() {
        if (this.linkAddress.length < 8) {
            return 'Please enter more than 8 characters'
        }
    }

    @computed get valid() {
        return this.error === null
    }
}