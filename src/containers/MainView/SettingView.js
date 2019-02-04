import React from 'react'
import {StyleSheet, Alert} from 'react-native'
import i18n from '../../libs/Locale'
import SettingListView from "../SettingView/SettingListView";
import {inject, observer} from "mobx-react";
import {observable} from 'mobx'

@inject(['setting'])
@observer
export default class SettingView extends React.Component {

    get settingList() {
        const locale = this.props.setting.language
        const {currency} = this.props.setting
        return [
            {
                key: 'Setting.Language',
                labelText: i18n.t('lang_mainTxt', {locale}),
                subLabelText: locale,
            }, {
                key: 'Setting.Currency',
                labelText: i18n.t('bill_mainTxt', {locale}),
                subLabelText: currency,
            }, {
                key: 'SelectCoin',
                params: {nextPath : 'WalletImport'},
                labelText: i18n.t('import_wallet_mainTxt', {locale}),
                subLabelText: i18n.t('import_wallet_subTxt', {locale})
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
    }

    render() {
        return (
            <SettingListView list={this.settingList} onItemSelected={this.handleSettingSelected}/>
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
            this.props.navigation.navigate(key, this.settingList.find(setting => setting.key === key).params)
        }
    }
}

const styles = StyleSheet.create({
    reset: {
        color: '#ff6767',
    }
})