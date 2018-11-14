import React from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import TransactionCard from '../../components/TransactionCard/TransactionCard'
import CardSummary from '../../components/CardSummary/CardSummary'
// import styles from '../../components/PinCodeView/styles';

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
            <View style={styles.container}>
                <CardSummary />
                <List>
                    <FlatList
                        style={styles.TransactionListView}
                        data={this.state.data}
                        initialNumToRender={10}
                        onEndReachedThreshold={1}
                        onEndReached={this.onEndReached}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        renderItem={({ item }) =>
                            <TransactionCard
                                key={item.key}
                                date={'2018-11-15'}
                                email={item.email}
                                address={item.address}
                                coin={item.coin}
                                symbol={item.symbol}
                                confirm={item.confirm} />}
                    />
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingVertical: 40,
    },
    cardSummary: {
        position: 'relative',
        backgroundColor: '#627EEA',
        width: 316,
        height: 106,
        borderRadius: 6,
        padding: 20,
        left: '50%',
        transform: [
            { translateX: -158 },
        ],
        justifyContent: 'space-between'
    },
    cardSummaryIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        width: '100%',
        marginTop: 20,
        marginLeft: 20
    },
    cardSummaryIcon: {
        width: 32,
        height: 32,
        backgroundColor: 'white',
        borderRadius: 16
    },
    cardSummaryName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardSummaryCoinContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    cardSummaryCoinSymbol: {
        color: 'white',
        fontSize: 12,
        textAlignVertical: 'bottom',
        opacity: 0.5,
    },
    cardSummaryCoinValue: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5
    },
    cardSummaryAddressContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardSummaryAddressLinkbitAddress: {
        color: 'white',
        fontSize: 12,
        opacity: 0.5,
    },
    cardSummaryAddressActualAddress: {
        color: 'white',
        fontSize: 12,
    },
    TransactionListView: {
        width: '100%',
        margin: 0
    },
});