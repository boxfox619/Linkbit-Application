import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class TransactionCard extends React.Component {
    render() {
        const { date, email, address, coin, symbol, confirm } = this.props

        return (
            <View style={styles.TransactionRow}>
                <Text style={styles.TransactionRowDate}>{date}</Text>
                <View style={styles.TransactionRowAccountContainer}>
                    <Text style={styles.TransactionRowAccountContainerEmail}>{email}</Text>
                    <Text style={styles.TransactionRowAccountContainerAddress}>{address}</Text>
                </View>
                <View style={styles.TransactionRowAmountContainer}>
                    <Text style={styles.TransactionRowAmountContainerPlusCoin}>{`${coin} ${symbol}`}</Text>
                    <Text style={styles.TransactionRowAmountContainerConfirm}>{confirm}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TransactionListView: {
        width: '100%',
        margin: 0
    },
    TransactionRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        height: 79,
    },
    TransactionRowDate: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    TransactionRowAccountContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
    },
    TransactionRowAccountContainerEmail: {
        fontSize: 16
    },
    TransactionRowAccountContainerAddress: {
        fontSize: 12,
        color: '#555555'
    },
    TransactionRowAmountContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },
    TransactionRowAmountContainerPlusCoin: {
        fontSize: 16,
        color: '#0088FF',
        fontWeight: 'bold',
        textAlign: 'right',
        alignItems: 'flex-end'
    },
    TransactionRowAmountContainerConfirm: {
        fontSize: 12,
        color: '#555555',
        textAlign: 'right'
    }
});