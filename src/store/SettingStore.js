import { observable, action } from 'mobx'
import i18n from 'i18n-js'
import AsyncStorageApi from "../api/AsyncStorageApi";
import CoinPriceStore from './CoinPriceStore';

class SettingStore {
    @observable language = 'ko'
    @observable currency = 'USD'
    @observable pin = ''
    @observable useFingerprint = false
    @observable isInitialExecution = false

    load = async () => {
        const obj = await AsyncStorageApi.getObject(['language', 'currency', 'pin', 'useFingerprint', 'initialExecution'])
        this.language = obj.language || 'ko'
        this.currency = obj.currency || 'USD'
        this.pin = obj.pin
        this.useFingerprint = (obj.useFingerprint || false) === 'true'
        this.isInitialExecution = !obj.initialExecution
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

    @action finishInitialExecution = async () => {
        this.isInitialExecution = false   
        await this.save()
    }

    get usePin() {
        return (this.pin !== undefined && this.pin !== null && this.pin !== 'null' && !!this.pin)
    }

    save = async () => {
        await AsyncStorageApi.saveObject({
            language: this.language,
            currency: this.currency,
            pin: this.pin,
            useFingerprint: this.useFingerprint,
            initialExecution: this.isInitialExecution
        })
    }
}

export default new SettingStore()
