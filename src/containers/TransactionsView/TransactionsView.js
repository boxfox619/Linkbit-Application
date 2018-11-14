import React from 'react';
import {View, StyleSheet} from 'react-native'
import TransactionsList from '../../components/Transaction/TransactionListView'
import CardSummary from '../../components/CardSummary/CardSummary'
import TransactionStore from "../../store/TransactionStore";

export default class TransactionsView extends React.Component {
    constructor(props){
        super(props)
        this.store = new TransactionStore()
    }
    render() {
        return (
            <View style={styles.container}>
                <CardSummary symbol={''} accountAddress={''} linkedAddress={''} balance={''}/>
                <TransactionsList fetchTransaction={this.fetchTransaction} data={this.store.transactions}/>
            </View>
        )
    }

    fetchTransaction = (page, count) => {
        this.store.fetchTransactions(page, count)
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingVertical: 0,
    }
});