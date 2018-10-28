import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

export default class CoinCard extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        moneySymbol: PropTypes.string.isRequired,
        balance: PropTypes.string,
        price: PropTypes.string,
        themeColor: PropTypes.string
    };

    static defaultProps = {
        balance: '0',
        price: '0',
        themeColor: '#bbaad'
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onPress} style={[styles.container, this.getCardStyle()]}>
                    <Text style={[styles.label, this.getTextColor()]}>{this.props.name}</Text>
                    <View style={styles.valuesWrapper}>
                        <View style={styles.values}>
                            <Text style={[styles.symbol, this.getTextColor()]}>{this.props.symbol}</Text>
                            <Text style={[styles.value, this.getTextColor()]}>{this.props.balance}</Text>
                        </View>
                        <View style={[styles.values, {right: 0}]}>
                            <Text style={[styles.symbol, this.getTextColor()]}>{this.props.moneySymbol}</Text>
                            <Text style={[styles.value, this.getTextColor()]}>{this.props.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    getCardStyle = () => {
        return {borderColor: this.props.themeColor};
    };

    getTextColor = () => {
        return {color: this.props.themeColor};
    };
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 3,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        marginBottom: 3
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4
    },
    valuesWrapper: {
        position: 'relative',
        marginTop: 20
    },
    values: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    value: {
        fontSize: 17,
    },
    symbol: {
        fontSize: 14,
        marginRight: 5
    },
});