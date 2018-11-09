import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WalletListView from "./WalletListView";
import {Header} from 'react-native-elements';

export default class MainTabView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={'#ffffff'}
                    leftComponent={<Text style={styles.title}>Wallet</Text>}
                    rightComponent={{ icon: 'payment', color: '#000000' }}
                />
                <View style={styles.content}>
                    <WalletListView/>
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
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    content: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20
    }

});