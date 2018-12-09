import { createStackNavigator } from 'react-navigation'
import i18n from '../libs/Locale'
import MainTabView from './MainView/MainTabView'
import AddressListView from './AddressView/AddressListView'
import AddressManagementView from './AddressView/AddressManagementView'
import WalletSearchView from './AddressView/WalletSearchView'
import AddressBuyContainer from './AddressView/AddressBuyContainer/AddressBuyContainer'

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
}, {
  initialRouteName: 'Main',
})
