import { observable, action } from 'mobx'
import i18n from 'i18n-js'
import { Dimensions } from 'react-native'
import AsyncStorageApi from "../api/AsyncStorageApi";
import CoinPriceStore from './Coin/CoinPriceStore';

class SettingStore {
    @observable language = 'ko'
    @observable currency = 'USD'
    @observable pin = ''
    @observable useFingerprint = false

    @observable.struct windowDimensions = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }

    load = async () => {
        const obj = await AsyncStorageApi.getObject(['language', 'currency', 'pin', 'useFingerprint'])
        this.language = obj.language || 'ko'
        this.currency = obj.currency || 'USD'
        this.pin = obj.pin
        this.useFingerprint = (obj.useFingerprint || false) === 'true'
    }

    @action setLanguage = async val => {
        this.language = val
        i18n.locale = val
        await this.save()
    }

    @action setCurrency = async val => {
        this.currency = val
        await this.save()
        await CoinPriceStore.refreshCoinPrices()
    }

    @action unsetPin = async () => {
        this.pin = ''
        await this.save()
    }

    @action setPin = async val => {
        this.pin = val
        await this.save()
    }

    @action setFingerprint = async val => {
        this.useFingerprint = val
        await this.save()
    }

    get usePin() {
        return (this.pin !== undefined && !!this.pin)
    }

    save = async () => {
        await AsyncStorageApi.saveObject({
            language: this.language,
            currency: this.currency,
            pin: this.pin,
            useFingerprint: this.useFingerprint
        })
    }
}

export default new SettingStore()
