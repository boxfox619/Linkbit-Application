import {observable, action} from 'mobx'
import i18n from 'i18n-js'
import {Dimensions} from 'react-native'
import AsyncStorageApi from "../api/AsyncStorageApi";

class SettingStore {
    @observable language = 'ko'
    @observable currency = 'USD'

    @observable.struct windowDimensions = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }

    constructor(){
        AsyncStorageApi.getObject(['language', 'currency']).then(obj => {
            this.language = obj.language || 'ko'
            this.currency = obj.currency || 'USD'
        })
    }

    @action setLanguage = async (val) => {
        this.language = val
        i18n.locale = val
        await this.save()
    }

    @action setCurrency = async (val) => {
        this.currency = val
        await this.save()
    }

    save = async () => {
        await AsyncStorageApi.saveObject({
            language: this.language,
            currency: this.currency
        })
    }
}

export default new SettingStore()
