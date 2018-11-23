//https://medium.com/react-native-training/react-native-navigation-v2-by-wix-getting-started-7d647e944132
import {Navigation} from 'react-native-navigation';

export function registerScreens() {
    Navigation.registerComponent('AddressList', () => require('./AddressView/AddressListView').default)
    Navigation.registerComponent('AddressManagement', () => require('./AddressView/AddressManagementView').default)
    Navigation.registerComponent('AddressBuy', () => require('./AddressView/AddressBuyView').default)
    Navigation.registerComponent('AddressBuyPricing', () => require('./AddressView/AddressBuyPricingView').default)
    Navigation.registerComponent('AddressBuyFinish', () => require('./AddressView/AddressBuyFinishView').default)
    Navigation.registerComponent('Main', () => require('./MainView/MainTabView').default)
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                component: {
                    name: 'Main'
                }
            },
        });
    });
}