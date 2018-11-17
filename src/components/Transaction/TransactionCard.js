import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';

export default class TransactionCard extends React.Component {
    static propTypes = {
        date: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        symbol: PropTypes.string.isRequired,
        confirm: PropTypes.number.isRequired
    }

    render() {
        const {date, email, address, amount, symbol, confirm} = this.props

        return (
            <View style={styles.transactionRow}>
                <Text style={styles.date}>{date}</Text>
                <View style={styles.accountContainer}>
                    <Text style={styles.email}>{email}</Text>
                    <Text style={styles.address}>{address}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={[styles.amount, this.getAmountColor()]}>{`${amount} ${symbol}`}</Text>
                    <Text style={styles.confirm}>{confirm}</Text>
                </View>
            </View>
        )
    }

    getAmountColor = () => {
        if (this.props.amount > 0) {
            return {color: '#0088FF'}
        } else {
            return {color: 'red'}
        }
    }
}

const styles = StyleSheet.create({
    TransactionListView: {
        width: '100%',
        margin: 0
    },
    transactionRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        height: 79,
    },
    date: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    accountContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%'
    },
    email: {
        fontSize: 16
    },
    address: {
        fontSize: 12,
        color: '#555555'
    },
    amountContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        alignItems: 'flex-end'
    },
    confirm: {
        fontSize: 12,
        color: '#555555',
        textAlign: 'right'
    }
});