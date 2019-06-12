import {observable, runInAction, action} from 'mobx'
import AddressStorageApi from '../../api/Address/AddressStorageApi'
import * as AddressNetworkApi from '../../api/Address/AddressNetworkApi'
import LinkedAddress from './LinkedAddress'

class AddressStore {
    @observable linkedAddressList = []
    addressStorageApi
    @observable isLoading = false

    constructor() {
        this.addressStorageApi = new AddressStorageApi()
    }

    loadAddressList = async () => {
        this.isLoading = true
        const addressList = await this.addressStorageApi.getAddressList()
        runInAction(() => {
            this.linkedAddressList = addressList.map(addressData => {
                let linkedAddress = new LinkedAddress(this)
                linkedAddress.updateFromJson(addressData)
                return linkedAddress
            })
            this.isLoading = false
        })
    }


    @action updateAddress = async (json) => {
        let linkedAddress = this.linkedAddressList.find(linked => linked.linkAddress === json.linkAddress)
        if (!linkedAddress) {
            linkedAddress = new LinkedAddress(this, json)
            this.linkedAddressList = [...this.linkedAddressList, linkedAddress]
            await this.addressStorageApi.addAddress(json)
        } else {
            linkedAddress.updateFromJson(json)
            await this.addressStorageApi.updateAddress(json)
        }
    }

    linkAddress = async (linkAddress, symbol, accountAddress) => {
        const token = await this.addressStorageApi.getCertificationToken()
        const res = await AddressNetworkApi.linkAddress(token, linkAddress, symbol, accountAddress)
        if (res) {
            this.linkedAddressList.find(linked => linked.linkAddress === linkAddress).setAccountAddress(symbol, accountAddress)
            await this.save()
        }
        return res
    }

    unlinkAddress = async (linkAddress, symbol) => {
        const token = await this.addressStorageApi.getCertificationToken()
        const res = await AddressNetworkApi.unlinkAddress(token, linkAddress, symbol)
        if (res) {
            this.linkedAddressList.find(linked => linked.linkAddress === linkAddress).setAccountAddress(symbol, undefined)
            await this.save()
        }
        return res
    }

    deleteAddress = async (linkaddress) => {
        const token = await this.addressStorageApi.getCertificationToken()
        const res = await AddressNetworkApi.deleteLinkAddress(token, linkaddress)
        if (res) {
            const idx = this.linkedAddressList.findIndex(linked => linked.linkAddress === linkaddress)
            this.linkedAddressList.splice(idx, 1);
            await this.save()
        }
        return res
    }

    save = () => {
        this.addressStorageApi.saveAddressList(this.linkedAddressList.map(link => link.asJson)).catch(err => alert(err))
    }

    getLinkedAddress = (symbol, accountAddress) => {
        return this.linkedAddressList.filter(linked => linked.getAccountAddress(symbol) === accountAddress)
    }
}

export default new AddressStore()
