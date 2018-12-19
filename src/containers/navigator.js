import {createStackNavigator} from 'react-navigation'
import i18n from '../libs/Locale'
import MainTabView from './MainView/MainTabView'
import AddressListView from './AddressView/AddressListView'
import AddressManagementView from './AddressView/AddressManagementView'
import WalletSearchView from './AddressView/WalletSearchView'
import AddressBuyContainer from './AddressView/AddressBuyContainer/AddressBuyContainer'
import SelectWalletView from './CreateWalletView/SelectWalletView/SelectWalletView'
import SelectWalletDetailView from './CreateWalletView/SelectWalletDetailView/SelectWalletDetailView'
import InputWalletDetailView from './CreateWalletView/InputWalletInformationView/InputWalletInformationView'

export default createStackNavigator({
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
            }),
        },
        AddressBuy: AddressBuyContainer,
        AddressManagement: AddressManagementView,
        WalletSearch: WalletSearchView,
        SelectWallet: SelectWalletView,
        SelectWalletDetail: SelectWalletDetailView,
        InputWalletDetail: InputWalletDetailView
    },
    {
        initialRouteName: 'Main',
    },
)