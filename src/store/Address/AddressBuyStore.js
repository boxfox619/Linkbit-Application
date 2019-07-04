import { observable, action, computed } from 'mobx'
import AddressStore from './AddressStore'
import * as AddressApi from '../../api/Address/AddressNetworkApi'
import AddressStorageApi from '../../api/Address/AddressStorageApi'
import i18n from '../../libs/Locale'

export default class AddressBuyStore {
    @observable linkaddress = ''
    addressStorageApi
    @observable isProcessing = false

    constructor() {
      this.addressStorageApi = new AddressStorageApi()
    }

    getNewAddress = async () => {
      this.isProcessing = true
      const coreAddress = await this.addressStorageApi.getCoreAddress()
      const token = await this.addressStorageApi.getCertificationToken()
      const res = await AddressApi.createLinkAddress(coreAddress, token, this.linkaddress)
      if (res) {
        await AddressStore.updateAddress({ ownAddress: coreAddress, linkaddress: this.linkaddress })
      }
      this.isProcessing = false
    }

    @action setAddress = (address) => {
      this.linkaddress = address
    }

    @computed get error() {
      if (this.linkaddress.length < 8) {
        return i18n.t('err_8char')
      }
      
      return undefined
    }

    @computed get valid() {
      return this.error === null
    }
}
