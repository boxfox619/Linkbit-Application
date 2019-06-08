import {AsyncStorage} from 'react-native'
import crypto from 'crypto'
import ECIES from 'eth-ecies'
import * as AddressApi from "../../api/Address/AddressNetworkApi"
import * as ethUtil from 'ethereumjs-util'

const ADDRESS_STORAGE_KEY = "address"
const CORE_KEY = "core-key"

export default class AddressStorageApi {
    addressList = []

    getAddressList = async () => {
        if(!this.addressList || this.addressList.length === 0){
            await this.loadAddressList();
        }
        return this.addressList
    }

    updateAddress = async (addressData) => {
        const addressList = await this.getAddressList()
        const idx = addressList.findIndex(address => (address.address === addressData.address))
        addressList.splice(idx, 1, addressData)
        await this.saveAddressList(addressList)
    }

    addAddress = async (addressData) => {
        const addressList = await this.getAddressList()
        addressList.push(addressData)
        await this.saveAddressList(addressList)
    }

    removeAddress = async (linkAddress) => {
        const addressList = await this.getAddressList()
        const idx = addressList.findIndex(address => (address.address === linkAddress))
        addressList.splice(idx, 1)
        await this.saveAddressList(addressList)
    }

    saveAddressList = async (addressList) => {
        this.addressList = addressList
        AsyncStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addressList))
    }

    loadAddressList = async () => {
        const addressList = await AsyncStorage.getItem(ADDRESS_STORAGE_KEY) || '[]'
        this.addressList = JSON.parse(addressList)
    }

    getCoreKey = async () => {
        const coreKey = await AsyncStorage.getItem(CORE_KEY) || crypto.randomBytes(32).toString('hex')
        await AsyncStorage.setItem(CORE_KEY, coreKey)
        return coreKey
    }

    getCertificationToken = async () => {
        const getCorePrivateKey = await this.getCoreKey()
        const privateKey = Buffer.from(getCorePrivateKey, 'hex')
        const publicKey = ethUtil.privateToPublic(privateKey).toString('hex')
        const token = await AddressApi.createToken(publicKey)
        const decryptedToken = await ECIES.decrypt(privateKey, Buffer.from(token, 'hex'))
        return decryptedToken
    }

    getCoreAddress = async () => {
        const getCorePrivateKey = await this.getCoreKey()
        const privateKey = Buffer.from(getCorePrivateKey, 'hex')
        const publicKey = ethUtil.privateToPublic(privateKey)
        return ethUtil.pubToAddress(publicKey).toString("hex")
    }
}