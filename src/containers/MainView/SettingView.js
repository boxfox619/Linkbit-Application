import React from 'react'
import {StyleSheet, Alert} from 'react-native'
import i18n from '../../libs/Locale'
import SettingListView from "../SettingView/SettingListView";
import {inject, observer} from "mobx-react/index";

@inject(['setting'])
@observer
export default class SettingView extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const locale = this.props.setting.language
        const {currency} = this.props.setting
        const settingList = [
            {
                key: 'Setting.Language',
                labelText: i18n.t('lang_mainTxt', {locale}),
                subLabelText: locale === 'ko' ? '한국어' : 'English',
            }, {
                key: 'Setting.Currency',
                labelText: i18n.t('bill_mainTxt', {locale}),
                subLabelText: currency,
            }, {
                key: 'Security',
                labelText: i18n.t('lock_mainTxt', {locale}),
                subLabelText: i18n.t('lock_subTxt', {locale}),
            }, {
                key: 'reset',
                labelText: i18n.t('reset_mainTxt', {locale}),
                labelStyle: styles.reset,
                subLabelText: i18n.t('reset_subTxt', {locale}),
            }
        ]
        return (
            <SettingListView list={settingList} onItemSelected={this.handleSettingSelected}/>
        )
    }

    handleSettingSelected = (key) => {
        if (key === 'reset') {
            Alert.alert(
                i18n.t('reset_mainTxt'),
                i18n.t('reset_subTxt'),
                [
                    {text: i18n.t('cancel'), style: 'cancel'},
                    {text: i18n.t('reset_mainTxt').toLowerCase(), onPress: () => this.handleSetView('Setting')},
                ],
                {cancelable: false},
            )
        } else {
            this.props.navigation.navigate(key)
        }
    }
}

const styles = StyleSheet.create({
    reset: {
        color: '#ff6767',
    }
})
