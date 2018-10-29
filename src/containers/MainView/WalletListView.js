import React from 'react';
import {View, StyleSheet, Dimensions, Text, ScrollView} from 'react-native';
import {WalletList} from "../../components";

export default class WalletListView extends React.Component {
    @observable walletList = [];
    //@TODO wallet list lookup

    constructor(props) {
        super(props);
        this.state = {
            test: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <WalletList
                    wallets={this.walletList}
                    onWalletSelected={w => this.openWalletDetail(w)}
                />
            </View>
        )
    }

    openWalletDetail = (w) => {
        //@TODO implement wallet detail open
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});