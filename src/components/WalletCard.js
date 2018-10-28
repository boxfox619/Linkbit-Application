import React from 'react';
import PropTypes from 'prop-types';
import {Modal, View, Text, StyleSheet, Image} from 'react-native';
import {HOST} from '../libs/Constraints';

const iconUrl = require('../../assets/splash.png');

export default class WalletCard extends React.Component {

    static propTypes = {
        coinName: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        moneySymbol: PropTypes.string.isRequired,
        balance: PropTypes.string,
        price: PropTypes.string,
        themeColor: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        balance: '0',
        price: '0',
        themeColor: '#594343'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View onClick={() => this.onClick} style={[styles.container, {borderColor: this.props.themeColor}]}>
                <Text style={[styles.label, {color: this.props.themeColor}]}>{this.props.coinName}</Text>
                <View style={styles.values}>
                    <Text style={[styles.symbol, {color: this.props.themeColor}]}>{this.props.symbol}</Text>
                    <Text style={[styles.value, {color: this.props.themeColor}]}>{this.props.balance}</Text>
                </View>
                <View style={[styles.values, {marginBottom: 5}]}>
                    <Text style={[styles.symbol, {color: this.props.themeColor}]}>{this.props.moneySymbol}</Text>
                    <Text style={[styles.value, {color: this.props.themeColor}]}>{this.props.price}</Text>
                </View>
                <View style={styles.iconWrapper}>
                    <Image style={styles.icon} soruce={{uri: this.getIconUrl()}}/>
                </View>
            </View>
        )
    }

    getIconUrl = () => {
        return `${HOST}/assets/${this.props.symbol.toUpperCase()}.png`;
    }

    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick()
        }
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        borderWidth: 3,
        padding: 15,
        position: 'relative'
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 13
    },
    values: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    value: {
        fontSize: 19,
    },
    symbol: {
        fontSize: 15,
        marginRight: 5
    },
    iconWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 0,
        bottom: 0,
        width: 40
    },
    icon: {
        width: 40,
        height: 40
    }
});