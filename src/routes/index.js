import { createStackNavigator, createAppContainer } from 'react-navigation'
import { MainTabView } from './main'
import { AddressManagementView, WalletSearchView, AddressBuyView, AddressBuyFinishView } from './address'
import { WalletDetailView, CreateWalletView, ImportWalletView, TransactionDetailView, SelectCoinView } from './wallet'
import { WithdrawView, InvoiceView } from './withdraw'
import { SecurityView } from './security'
import { LanguageSettingView, CurrencySettingView } from './setting'


const Navigator = createStackNavigator({
    Main: MainTabView,
    AddressBuy: AddressBuyView,
    AddressBuyFinish: AddressBuyFinishView,
    AddressManagement: AddressManagementView,
    WalletSearch: WalletSearchView,
    WalletImport: ImportWalletView,
    WalletDetail: WalletDetailView,
    Withdraw: WithdrawView,
    Invoice: InvoiceView,
    Security: SecurityView,
    'Setting.Language': LanguageSettingView,
    'Setting.Currency': CurrencySettingView,
    SelectCoin: SelectCoinView,
    CreateWallet: CreateWalletView,
    TransactionDetail: TransactionDetailView,
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
        },
    }
)

export default createAppContainer(Navigator)