import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MainTabView, AddressView} from "./src/containers";
import {Provider} from 'mobx-react';
import {WalletStore, CoinStore, AddressStore} from "./src/store";

const store = {
    wallet: WalletStore,
    coin: CoinStore,
    address: AddressStore
};

export default class App extends React.Component {
    componentWillMount() {
        store.address.loadAddressList();
        store.wallet.loadWalletList();
    }

    render() {
        return (
            <Provider {...store}>
                <View style={styles.container}>
                    <AddressView/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
