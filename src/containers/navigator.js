import { createStackNavigator } from 'react-navigation'
import MainTabView from './MainView/MainTabView'
import TransactionDetailView from './TransactionDetailView'
import {AddressManagementView, WalletSearchView, AddressBuyView, AddressBuyFinishView} from './address'
import {WalletDetailView, CreateWalletView, ImportWalletView, } from './wallet'
import RemittanceView from "./RemittanceView/RemittanceView"
import InvoiceView from './RemittanceView/InvoiceView/InvoiceView'
import SecurityView from './SecurityView/SecurityView'
import LanguageSettingView from './SettingView/LanguageSettingView'
import CurrencySettingView from './SettingView/CurrencySettingView'
import SelectCoinView from './SelectCoinView'

export default createStackNavigator({
    Main: MainTabView,
    AddressBuy: AddressBuyView,
    AddressBuyFinish: AddressBuyFinishView,
    AddressManagement: AddressManagementView,
    WalletSearch: WalletSearchView,
    WalletImport: ImportWalletView,
    WalletDetail: WalletDetailView,
    Withdraw: RemittanceView,
    Invoice: InvoiceView,
    Security: SecurityView,
    "Setting.Language": LanguageSettingView,
    "Setting.Currency": CurrencySettingView,
    SelectCoin: SelectCoinView,
    CreateWallet: CreateWalletView,
    TransactionDetail: TransactionDetailView
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