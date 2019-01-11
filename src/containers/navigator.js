import {createStackNavigator} from 'react-navigation'
import MainTabView from './MainView/MainTabView'
import AddressManagementView from './AddressView/AddressManagementView'
import WalletSearchView from './AddressView/WalletSearchView'
import WalletDetailView from './WalletDetailView/WalletDetailView'
import AddressBuyContainer from './AddressView/AddressBuyContainer/AddressBuyContainer'
import SelectWalletCoinView from './CreateWalletView/SelectWalletCoinView/SelectWalletCoinView'
import SelectWalletTokenView from './CreateWalletView/SelectWalletTokenView/SelectWalletTokenView'
import EnterWalletDetailView from "./CreateWalletView/EnterWalletDetailView/EnterWalletDetailView"
import RemittanceView from "./RemittanceView/RemittanceView";

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
        "CreateWallet.SelectWalletCoin": SelectWalletCoinView,
        "CreateWallet.SelectWalletToken": SelectWalletTokenView,
        "CreateWallet.EnterWalletDetail": EnterWalletDetailView
    },
    {
        initialRouteName: 'Main',
    },
)