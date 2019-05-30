import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export default class AmountBox extends React.Component {
    static propTypes = {
        price: PropTypes.any.isRequired,
        moneySymbol: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        amount: PropTypes.any.isRequired,
        onPress: PropTypes.func.isRequired
    }

    render() {
        const { price, moneySymbol, symbol, amount, onPress} = this.props
        return (
            <TouchableOpacity onPress={onPress} style={styles.toAmountContainer}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={styles.toAmountSymbol}>{moneySymbol}</Text>
                    <Text style={styles.toAmount}>{price}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={styles.toAmountSymbol}>{symbol}</Text>
                    <Text style={styles.toAmount}>{amount}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    toAmountContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#594343',
        backgroundColor: '#594343',
        borderRadius: 5,
        borderWidth: 3,
        height: 53,
        width: '100%',
        paddingHorizontal: 13,
        alignContent: 'center',
        alignItems: 'center',
    },
    toAmountSymbol: {
        color: '#888888',
        marginHorizontal: 2,
        fontSize: 14,
    },
    toAmount: {
        color: '#ffffff',
        fontSize: 14,
    },
})
