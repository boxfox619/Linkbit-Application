import {observable, action, computed} from 'mobx'
import AddressStore from './AddressStore'
import AddressNetworkApi from "../../api/Address/AddressNetworkApi"
import AddressStorageApi from "../../api/Address/AddressStorageApi"
import i18n from '../../libs/Locale'

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
            return i18n.t('err_8char')
        }
    }

    @computed get valid() {
        return this.error === null
    }
}
