import React from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'

export default class CardSummary extends React.Component {
    render() {
        return (
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
        )
    }
}

const styles = StyleSheet.create({
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
});