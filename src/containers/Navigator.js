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
      headerBackTitle: 'main',
    }),
  },
  Address: {
    screen: AddressListView,
    navigationOptions: () => ({
      title: '',
      headerBackTitle: i18n.t('address_list'),
    }),
  },
  AddressBuy: {
    screen: AddressBuyContainer,
    navigationOptions: () => ({
      title: '',
      headerBackTitle: 'address_buy',
    }),
  },
  AddressManagement: {
    screen: AddressManagementView,
    navigationOptions: () => ({
      title: '',
      headerBackTitle: 'address_management',
    }),
  },
  WalletSearch: {
    screen: WalletSearchView,
    navigationOptions: () => ({
      title: '',
      headerBackTitle: 'wallet_search',
    }),
  }
}, {
    initialRouteName: 'Main',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        border: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  })
