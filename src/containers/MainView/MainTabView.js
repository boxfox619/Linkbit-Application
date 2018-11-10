import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WalletListView from "./WalletListView";
import TransactionsView from "../TransactionsView/TransactionsView"
import { Header } from 'react-native-elements';

export default class MainTabView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={'#ffffff'}
                    leftComponent={<Text style={styles.title}>WALLET</Text>}
                    rightComponent={{ icon: 'payment', color: '#000000', marginRight: 10 }}
                    outerContainerStyles={{ borderBottomWidth: 0, height: 80 }}
                />
                <View style={styles.content}>
                    {/* <WalletListView /> */}
                    <TransactionsView />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    content: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    }

});