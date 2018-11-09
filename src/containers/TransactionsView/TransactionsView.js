import React from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
// import styles from '../../components/PinCodeView/styles';

function randomUsers(count = 10) {
    const arr = []
    for (let i = 0; i < count; i++) {
        const random = Math.random() * 100
        arr.push({
            key: random,
            name: random,
            avatar: random,
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
                <View style={styles.cardSummary}>
                    <View style={styles.cardSummaryIconContainer}>
                        <Image style={styles.cardSummaryIcon} />
                    </View>
                    <Text style={styles.cardSummaryName}>Name</Text>
                    <View>
                        <View style={styles.cardSummaryCoinContainer}>
                            <Text style={styles.cardSummaryCoinSymbol}>Symbol</Text>
                            <Text style={styles.cardSummaryCoinValue}>Value</Text>
                        </View>
                        <View style={styles.cardSummaryAddressContainer}>
                            <Text style={styles.cardSummaryAddressLinkbitAddress}>Linkbit Address</Text>
                            <Text style={styles.cardSummaryAddressActualAddress}>Actual Address</Text>
                        </View>
                    </View>
                </View>
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
                            <View style={styles.TransactionRow}>
                                <Text style={styles.TransactionRowDate}>2018.10.10</Text>
                                <View style={styles.TransactionRowAccountContainer}>
                                    <Text style={styles.TransactionRowAccountContainerEmail}>{item.key}</Text>
                                    <Text style={styles.TransactionRowAccountContainerAddress}>{item.avatar}</Text>
                                </View>
                                <View style={styles.TransactionRowAmountContainer}>
                                    <Text style={styles.TransactionRowAmountContainerPlusCoin}>{item.key}</Text>
                                    <Text style={styles.TransactionRowAmountContainerConfirm}>{item.avatar}</Text>
                                </View>
                            </View>
                        }
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