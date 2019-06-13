import { observable, action, computed } from 'mobx'
import AddressStore from './AddressStore'
import * as AddressApi from "../../api/Address/AddressNetworkApi"
import AddressStorageApi from "../../api/Address/AddressStorageApi"
import i18n from '../../libs/Locale'

export default class AddressBuyStore {
    @observable linkAddress = ''
    addressStorageApi
    @observable isProcessing = false

    constructor() {
        this.addressStorageApi = new AddressStorageApi()
    }

    getNewAddress = async () => {
        this.isProcessing = true
        const coreAddress = await this.addressStorageApi.getCoreAddress()
        const token = await this.addressStorageApi.getCertificationToken()
        const res = await AddressApi.createLinkAddress(coreAddress, token, this.linkAddress)
        if (res) {
            await AddressStore.updateAddress({ ownAddress: coreAddress, linkAddress: this.linkAddress })
        }
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
