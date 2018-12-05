import React from 'react';
import {View, StyleSheet} from 'react-native'
import {WalletSummaryCard, TransactionList} from '../../components'
import {TransactionStore} from "../../store";

export default class TransactionListView extends React.Component {
    constructor(props){
        super(props)
        this.store = new TransactionStore()
    }
    render() {
        return (
            <View style={styles.container}>
                <WalletSummaryCard symbol={''} accountAddress={''} linkedAddress={''} balance={''}/>
                <TransactionList fetchTransaction={this.fetchTransaction} data={this.store.transactions}/>
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