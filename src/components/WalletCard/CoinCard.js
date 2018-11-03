import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {HOST, PRIMARY_COLOR} from '../../libs/Constraints';

export default class CoinCard extends React.Component {

    static propTypes = {
        coinName: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        moneySymbol: PropTypes.string.isRequired,
        balance: PropTypes.string,
        price: PropTypes.string,
        themeColor: PropTypes.string,
        activate: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        balance: '0',
        price: '0',
        activate: false,
        themeColor: PRIMARY_COLOR
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onPress} style={[styles.container, this.getCardStyle()]}>
                    <Text style={[styles.label, this.getTextColor()]}>{this.props.coinName}</Text>
                    <View style={styles.values}>
                        <Text style={[styles.symbol, this.getTextColor()]}>{this.props.symbol}</Text>
                        <Text style={[styles.value, this.getTextColor()]}>{this.props.balance}</Text>
                    </View>
                    <View style={[styles.values, {marginBottom: 5}]}>
                        <Text style={[styles.symbol, this.getTextColor()]}>{this.props.moneySymbol}</Text>
                        <Text style={[styles.value, this.getTextColor()]}>{this.props.price}</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                        <Image style={styles.icon} soruce={{uri: this.getIconUrl()}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    getCardStyle = () => {
        let style = {borderColor: this.props.themeColor};
        if (this.props.activate) {
            style.backgroundColor = this.props.themeColor;
        }
        return style;
    };

    getTextColor = () => {
        return {color: (this.props.activate) ? '#ffffff' : this.props.themeColor};
    };

    getIconUrl = () => {
        return `${HOST}/assets/${this.props.symbol.toUpperCase()}.png`;
    };

    onPress = () => {
        if (this.props.onClick) {
            this.props.onClick()
        }
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 3,
        paddingVertical: 10,
        paddingHorizontal: 15,
        position: 'relative'
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 13,
        marginTop: 4
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