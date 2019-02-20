import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image } from 'react-native'
import { inject, observer } from "mobx-react/index";
import { HOST } from "../../libs/Constraints";

@inject('coin')
@observer
export default class WalletSummaryCard extends React.Component {
    static propTypes = {
        wallet: PropTypes.object.isRequired,
    }

    render() {
        const { symbol, name, balance, address } = this.props.wallet
        const color = this.props.coin.getCoin(symbol).themeColor
        return (
            <View style={[styles.container, { backgroundColor: color }]}>
                <View style={styles.iconContainer}>
                    <View style={styles.iconBackground}>
                        <Image style={styles.icon} source={{ uri: `${HOST}/assets/${symbol}.png` }} resizeMode={'contain'} />
                    </View>
                </View>
                <Text style={styles.name}>{name}</Text>
                <View>
                    <View style={styles.coinContainer}>
                        <Text style={styles.symbol}>{symbol}</Text>
                        <Text style={styles.balance}>{balance}</Text>
                    </View>
                    <View>
                        <Text style={styles.accountAddress}>{address}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: 106,
        borderRadius: 6,
        padding: 20,
        justifyContent: 'space-between',
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        width: '100%',
        marginTop: 20,
        marginLeft: 20,
    },
    iconBackground: {
        width: 32,
        height: 32,
        backgroundColor: 'white',
        borderRadius: 16,
        position: 'relative'
    },
    icon: {
        width: 26,
        height: 26,
        margin: 3,
    },
    name: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    coinContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    symbol: {
        color: 'white',
        fontSize: 12,
        textAlignVertical: 'bottom',
        opacity: 0.5,
    },
    balance: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
    linkedAddress: {
        color: 'white',
        fontSize: 12,
        opacity: 0.5,
    },
    accountAddress: {
        color: 'white',
        fontSize: 12,
        letterSpacing: -0.5,
    },
})
