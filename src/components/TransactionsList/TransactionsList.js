import React from 'react';
import { StyleSheet, FlatList } from 'react-native'
import TransactionCard from '../TransactionCard/TransactionCard'

function randomUsers(count = 10) {
    const arr = []
    for (let i = 0; i < count; i++) {
        const random = Math.random() * 100
        arr.push({
            key: random,
            email: 'abc@vw.xyz',
            address: '0xasd1231fdva1231vas',
            coin: '11.23',
            symbol: 'ETH',
            confirm: 'confirmed 91'
        })
    }
    return arr
}

export default class TransactionsView extends React.Component {
    state = {
        refreshing: false,
        data: randomUsers()
    }

    onEndReached = () => {
        this.setState(state => ({
            data: [
                ...state.data,
                ...randomUsers(),
            ]
        }))
    }

    onRefresh = () => {
        this.setState({
            data: randomUsers(20),
        })
    }

    render() {
        return (
            <FlatList
                style={styles.transactionListView}
                data={this.state.data}
                initialNumToRender={10}
                onEndReachedThreshold={1}
                onEndReached={this.onEndReached}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <TransactionCard
                        date={'2018-11-15'}
                        email={item.email}
                        address={item.address}
                        coin={item.coin}
                        symbol={item.symbol}
                        confirm={item.confirm} />}
            />
        )
    }
}

const styles = StyleSheet.create({
    transactionListView: {
        backgroundColor: 'red',
        borderStyle: 'dotted',
        width: '100%',
        margin: 0,
        marginTop: 20
    },
});