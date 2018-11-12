import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WalletList} from "../../components";
import {PRIMARY_COLOR} from "../../libs/Constraints";
import {inject, observer} from 'mobx-react';

@inject(['wallet'])
@observer
export default class WalletListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            test: false,
            totalBalance: 123124,
            linkedAddress: 'Linkbit-3156-3266',
            moneySymbol: 'KRW'
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.totalBalanceCard}>
                    <Text style={styles.totalBalanceLabel}>총 자산</Text>
                    <Text style={styles.totalBalanceAddressLabel}>{this.state.linkedAddress}</Text>
                    <View style={styles.balanceGroup}>
                        <Text style={styles.balance}>{this.state.totalBalance}</Text>
                        <Text style={styles.moneySymbol}>{this.state.moneySymbol}</Text>
                    </View>
                </View>
                <WalletList
                    moneySymbol={this.state.moneySymbol}
                    wallets={this.props.wallet.walletList}
                    onWalletSelected={w => this.openWalletDetail(w)}
                />
            </View>
        )
    }

    openWalletDetail = (w) => {
        //@TODO imp
        //
        // lement wallet detail open
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    totalBalanceCard: {
        backgroundColor: PRIMARY_COLOR,
        padding: 17,
        borderRadius: 6,
        marginBottom: 10
    },
    totalBalanceLabel: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    },
    totalBalanceAddressLabel: {
        color: '#ffffff',
        fontSize: 14
    },
    balanceGroup: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 17,
        top: 0,
        bottom: 0
    },
    balance: {
        color: '#ffffff',
        fontSize: 18,
        marginRight: 7
    },
    moneySymbol: {
        color: '#ffffff',
        fontSize: 14
    }
});