import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Image } from 'react-native';

export default class CardSummary extends React.Component {
    static propTypes = {
        symbol: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
        linkedAddress: PropTypes.string.isRequired,
        accountAddress: PropTypes.string.isRequired
    };
    render() {
        const {symbol, balance, linkedAddress, accountAddress} = this.props;
        return (
            <View style={styles.cardSummary}>
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} />
                </View>
                <Text style={styles.name}>Name</Text>
                <View>
                    <View style={styles.coinContainer}>
                        <Text style={styles.symbol}>{symbol}</Text>
                        <Text style={styles.balance}>{balance}</Text>
                    </View>
                    <View style={styles.addressContainer}>
                        <Text style={styles.linkedAddress}>{linkedAddress}</Text>
                        <Text style={styles.accountAddress}>{accountAddress}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardSummary: {
        position: 'relative',
        backgroundColor: '#627EEA',
        width: '100%',
        height: 106,
        borderRadius: 6,
        padding: 20,
        justifyContent: 'space-between'
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        width: '100%',
        marginTop: 20,
        marginLeft: 20
    },
    icon: {
        width: 32,
        height: 32,
        backgroundColor: 'white',
        borderRadius: 16
    },
    name: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    coinContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    symbol: {
        color: 'white',
        fontSize: 12,
        textAlignVertical: 'bottom',
        opacity: 0.5,
    },
    balance: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5
    },
    addressContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    linkedAddress: {
        color: 'white',
        fontSize: 12,
        opacity: 0.5,
    },
    accountAddress: {
        color: 'white',
        fontSize: 12,
    },
});