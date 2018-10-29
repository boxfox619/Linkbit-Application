import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WalletListView from "./WalletListView";

export default class MainTabView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <WalletListView/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20
    }

});