import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MainTabView} from "./src/containers";
import {Provider} from 'mobx-react';
import {WalletStore, CoinStore} from "./src/store";

const store = {
    wallet: WalletStore,
    coin: CoinStore
}

export default class App extends React.Component {
    render() {
        return (
            <Provider {...store}>
                <View style={styles.container}>
                    <MainTabView/>
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
