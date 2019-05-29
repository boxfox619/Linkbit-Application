import { observable, action, computed } from 'mobx'
import AddressStore from './AddressStore'
import ECIES from 'eth-ecies'
import * as ethUtil from 'ethereumjs-util'
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

    getCertificationToken = async () => {
        const getCorePrivateKey = await this.addressStorageApi.getCoreKey()
        const privateKey = Buffer.from(getCorePrivateKey, 'hex')
        const publicKey = ethUtil.privateToPublic()
        const token = await AddressApi.createToken(publicKey)
        const decryptedToken = await ECIES.decrypt(privateKey, Buffer.from(token, 'hex'))
        return decryptedToken
    }

    getCoreAddress = async () => {
        const getCorePrivateKey = await this.addressStorageApi.getCoreKey()
        const privateKey = Buffer.from(getCorePrivateKey, 'hex')
        const publicKey = ethUtil.privateToPublic(privateKey)
        return ethUtil.pubToAddress(publicKey).toString("hex")
    }

    getNewAddress = async () => {
        this.isProcessing = true
        const coreAddress = await this.getCoreAddress()
        const token = await this.getCertificationToken()
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
