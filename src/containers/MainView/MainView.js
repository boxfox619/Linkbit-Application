import React from 'react';
import {View, StyleSheet, Dimensions, Text, ScrollView} from 'react-native';
import {WalletCard} from "../../components";

export default class MainView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <WalletCard coinName={'이더리움'} symbol={'ETH'} moneySymbol={'KRW'} balance={'123,14'} price={'231,313,11'}/>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});