import { createStackNavigator } from 'react-navigation'
import MainTabView from './MainView/MainTabView'
import AddressManagementView from './AddressView/AddressManagementView'
import WalletSearchView from './AddressView/WalletSearchView'
import WalletDetailView from './WalletDetailView/WalletDetailView'
import AddressBuyContainer from './AddressView/AddressBuyContainer/AddressBuyContainer'
import RemittanceView from "./RemittanceView/RemittanceView"
import SecurityView from './SecurityView/SecurityView'
import LanguageSettingView from './SettingView/LanguageSettingView'
import CurrencySettingView from './SettingView/CurrencySettingView'
import SelectCoinView from './SelectCoinView/SelectCoinView'
import CreateWalletView from './CreateWalletView/CreateWalletView'

export default createStackNavigator({
    Main: MainTabView,
    AddressBuy: {
        screen: AddressBuyContainer,
        navigationOptions: () => ({
            title: '',
            headerBackTitle: 'address_buy',
        })
    },
    AddressManagement: {
        screen: AddressManagementView,
        navigationOptions: () => ({
            title: '',
            headerBackTitle: 'address_management'
        })
    },
    WalletSearch: {
        screen: WalletSearchView,
        navigationOptions: () => ({
            title: '',
            headerBackTitle: 'wallet_search',
        })
    },
    WalletDetail: WalletDetailView,
    Withdraw: RemittanceView,
    Security: SecurityView,
    "Setting.Language": LanguageSettingView,
    "Setting.Currency": CurrencySettingView,
    SelectCoin: SelectCoinView,
    CreateWallet: CreateWalletView
},
    {
        initialRouteName: 'Main',
        defaultNavigationOptions: {
            headerStyle: {
                marginTop: 5,
                marginLeft: 5,
                backgroundColor: '#fff',
                border: 0,
                // ios
                borderBottomWidth: 0,
                // android
                elevation: 0,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
)