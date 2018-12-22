import {createStackNavigator} from 'react-navigation'
import i18n from '../libs/Locale'
import MainTabView from './MainView/MainTabView'
import AddressListView from './AddressView/AddressListView'
import AddressManagementView from './AddressView/AddressManagementView'
import WalletSearchView from './AddressView/WalletSearchView'
import AddressBuyContainer from './AddressView/AddressBuyContainer/AddressBuyContainer'
import SelectWalletCoinView from './CreateWalletView/SelectWalletCoinView/SelectWalletCoinView'
import SelectWalletTokenView from './CreateWalletView/SelectWalletTokenView/SelectWalletTokenView'
import EnterWalletDetailView from "./CreateWalletView/EnterWalletDetailView/EnterWalletDetailView"

const Navigator = createStackNavigator({
        Main: {
            screen: MainTabView,
            navigationOptions: () => ({
                header: null,
            }),
        },
        Address: {
            screen: AddressListView,
            navigationOptions: () => ({
                title: i18n.t('address_list'),
                headerBackTitle: i18n.t('address_list_back'),
            })
        },
        AddressBuy: AddressBuyContainer,
        AddressManagement: AddressManagementView,
        WalletSearch: WalletSearchView,
        "CreateWallet.SelectWalletCoin": SelectWalletCoinView,
        "CreateWallet.SelectWalletToken": SelectWalletTokenView,
        "CreateWallet.EnterWalletDetail": EnterWalletDetailView
    },
    {
        initialRouteName: 'Main',
    },
)

export default Navigator
