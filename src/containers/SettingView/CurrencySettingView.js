import React from 'react'
import i18n from "../../libs/Locale"
import SettingListView from "./SettingListView"
import {observer, inject} from 'mobx-react'

@inject(['setting'])
@observer
export default class CurrencySettingView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: i18n.t('bill_mainTxt'),
            headerTitleStyle: { color: 'black' },
            headerStyle: { backgroundColor: 'white' },
        }
    }

    render(){
        const currency = [
            {
                labelText: i18n.t('bill_krw'),
                key: 'KRW',
            }, {
                labelText: i18n.t('bill_usd'),
                key: 'USD',
            }
        ]
        return (
            <SettingListView style={{padding: 20}} list={currency} onItemSelected={this.handleCurrencySetting}/>
        )
    }

    handleCurrencySetting = async (val) => {
        await this.props.setting.setCurrency(val)
        this.props.navigation.goBack(null)
    }
}