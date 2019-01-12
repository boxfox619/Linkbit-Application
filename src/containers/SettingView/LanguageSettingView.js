import React from 'react'
import i18n from "../../libs/Locale"
import SettingListView from "./SettingListView"
import {observer, inject} from 'mobx-react'

const language = [
    {
        labelText: i18n.t('lang_ko'),
        key: 'ko',
    }, {
        labelText: i18n.t('lang_en'),
        key: 'en',
    }
]

@inject(['setting'])
@observer
export default class LanguageSettingView extends React.Component {

    render() {
        return (
            <SettingListView list={language} onItemSelected={this.handleLanguageSetting}/>
        )
    }

    handleLanguageSetting = (val) => {
        this.props.setting.setLanguage(val)
        this.props.navigation.goBack(null)
    }
}