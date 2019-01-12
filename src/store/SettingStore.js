import {observable, action} from 'mobx'
import i18n from 'i18n-js'
import {Dimensions} from 'react-native'

class SettingStore {
    @observable language = 'ko'
    @observable currency = 'USD'

    @observable.struct windowDimensions = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }

    @action setLanguage = (val) => {
        this.language = val
        i18n.locale = val
    }

    @action setCurrency = (val) => {
        this.currency = val
    }
}

export default new SettingStore()
