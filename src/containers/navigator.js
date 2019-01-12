import {createStackNavigator} from 'react-navigation'
import MainTabView from './MainView/MainTabView'
import AddressManagementView from './AddressView/AddressManagementView'
import WalletSearchView from './AddressView/WalletSearchView'
import WalletDetailView from './WalletDetailView/WalletDetailView'
import AddressBuyContainer from './AddressView/AddressBuyContainer/AddressBuyContainer'
import SelectWalletCoinView from './CreateWalletView/SelectWalletCoinView/SelectWalletCoinView'
import SelectWalletTokenView from './CreateWalletView/SelectWalletTokenView/SelectWalletTokenView'
import EnterWalletDetailView from "./CreateWalletView/EnterWalletDetailView/EnterWalletDetailView"
import RemittanceView from "./RemittanceView/RemittanceView"
import SecurityView from './SecurityView/SecurityView'
import LanguageSettingView from './SettingView/LanguageSettingView'
import CurrencySettingView from './SettingView/CurrencySettingView'

export default createStackNavigator({
        Main: {
            screen: MainTabView,
            navigationOptions: () => ({
                header: null,
            }),
        },
        AddressBuy: AddressBuyContainer,
        AddressManagement: AddressManagementView,
        WalletSearch: WalletSearchView,
        WalletDetail: WalletDetailView,
        Withdraw: RemittanceView,
        Security: SecurityView,
        "Setting.Language": LanguageSettingView,
        "Setting.Currency": CurrencySettingView,
        "CreateWallet.SelectWalletCoin": SelectWalletCoinView,
        "CreateWallet.SelectWalletToken": SelectWalletTokenView,
        "CreateWallet.EnterWalletDetail": EnterWalletDetailView
    },
    {
        initialRouteName: 'Main',
    },
)