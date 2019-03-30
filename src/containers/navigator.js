import { createStackNavigator } from 'react-navigation'
import MainTabView from './MainView/MainTabView'
import AddressManagementView from './AddressView/AddressManagementView'
import WalletSearchView from './AddressView/WalletSearchView'
import WalletDetailView from './WalletDetailView/WalletDetailView'
import AddressBuyContainer from './AddressView/AddressBuyContainer/AddressBuyContainer'
import RemittanceView from "./RemittanceView/RemittanceView"
import InvoiceView from './RemittanceView/InvoiceView/InvoiceView'
import SecurityView from './SecurityView/SecurityView'
import LanguageSettingView from './SettingView/LanguageSettingView'
import CurrencySettingView from './SettingView/CurrencySettingView'
import SelectCoinView from './SelectCoinView/SelectCoinView'
import CreateWalletView from './CreateWalletView/CreateWalletView'
import ImportWalletView from './ImportWalletView/ImportWalletView'

export default createStackNavigator({
    Main: MainTabView,
    AddressBuy: {
        screen: AddressBuyContainer,
        navigationOptions: () => ({
            title: '',
            headerBackTitle: 'address_buy',
        })
    },
    AddressManagement: AddressManagementView,
    WalletSearch: WalletSearchView,
    WalletImport: {
        screen: ImportWalletView,
        navigationOptions: () => ({
            title: 'asdf',
            headerBackTitle: 'address_buy',
        })
    },
    WalletDetail: WalletDetailView,
    Withdraw: RemittanceView,
    Invoice: InvoiceView,
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
                // marginTop: 5,
                // marginLeft: 5,
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