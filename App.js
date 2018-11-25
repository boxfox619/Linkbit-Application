import React from 'react';
import {StyleSheet, View} from 'react-native';
import {registerScreens} from './src/containers/screens';
import {MainTabView} from "./src/containers";
import {Provider} from 'mobx-react';
import {WalletStore, CoinStore, AddressStore} from "./src/store";
import WalletSearchView from "./src/containers/AddressView/WalletSearchView";

const store = {
    wallet: WalletStore,
    coin: CoinStore,
    address: AddressStore
};
registerScreens(store, Provider);

export default class App extends React.Component {
    componentWillMount() {
        registerScreens();
        store.address.loadAddressList();
        store.wallet.loadWalletList();
    }

    render() {
        return (
            <Provider {...store}>
                <View style={styles.container}>
                    <MainTabView/>
                </View>
            </Provider>
        );
    }
/*
    componentDidMount() {
        Navigation.setRoot({
            root: {
                        {
                            component: {
                                name: 'Main'
                            }
                        }
            },
        });
    }*/
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
