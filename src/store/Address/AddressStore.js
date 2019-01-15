import {observable, runInAction, action} from 'mobx'
import AddressNetworkApi from '../../api/Address/AddressNetworkApi'
import AddressStorageApi from '../../api/Address/AddressStorageApi'
import LinkedAddress from './LinkedAddress'

class AddressStore {
    @observable linkedAddressList = []
    addressNetworkApi
    addressStorageApi
    @observable isLoading = false

    constructor() {
        this.addressNetworkApi = new AddressNetworkApi()
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

    addAddress = async (linkAddress, symbol, address) => {
        const res = await this.addressNetworkApi.registerAddress(linkAddress, symbol, address)
        if (res) {
            this.linkedAddressList.find(linked => linked.linkAddress === linkAddress).setAccountAddress(symbol, address)
            await this.save()
        }
        return res
    }

    deleteAddress = async (linkAddress, symbol) => {
        const res = await this.addressNetworkApi.unregisterAddress(linkAddress, symbol)
        if (res) {
            this.linkedAddressList.find(linked => linked.linkAddress === linkAddress).setAccountAddress(symbol, undefined)
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
