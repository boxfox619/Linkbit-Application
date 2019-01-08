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
                let linkedAddress = new LinkedAddress()
                linkedAddress.updateFromJson(addressData)
                return linkedAddress
            })
            this.isLoading = false
        })
    }


    @action updateAddress = async (json) => {
        let linkedAddress = this.linkedAddressList.find(linked => linked.address === json.address)
        if (!linkedAddress) {
            linkedAddress = new LinkedAddress()
            this.linkedAddressList = [...this.linkedAddressList, linkedAddress]
            await this.addressStorageApi.addAddress(json)
        } else {
            await this.addressStorageApi.updateAddress(json)
        }
        linkedAddress.updateFromJson(json)
    }

    getLinkedAddress = (symbol, accountAddress) => {
        const linkedAddressList = this.linkedAddressList.filter(linked => linked.getAccountAddress(symbol) === accountAddress)

        return linkedAddressList
    }
}

export default new AddressStore()
