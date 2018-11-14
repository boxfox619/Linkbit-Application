import React from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native'
import TransactionsList from '../../components/TransactionsList/TransactionsList'
import CardSummary from '../../components/CardSummary/CardSummary'
// import styles from '../../components/PinCodeView/styles';

export default class TransactionsView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <CardSummary />
                <TransactionsList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingVertical: 0,
    }
});