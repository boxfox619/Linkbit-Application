import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image } from 'react-native'
import { inject, observer } from 'mobx-react'
import { dollarFormat, fixed } from '../../libs/NumberFormatter'
import Wallet from '../../store/Wallet/Wallet'

@inject('coin', 'setting')
@observer
export default class WalletSummaryCard extends React.Component {
  static propTypes = {
    wallet: PropTypes.instanceOf(Wallet).isRequired,
  }

  get coin() {
    const { symbol } = this.props.wallet

    return this.props.coin.getCoin(symbol)
  }

  render() {
    const { symbol, name, balance, address } = this.props.wallet

    return (
      <View style={[styles.container, { backgroundColor: this.coin.themeColor }]}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Image style={styles.icon} source={this.coin.icon} resizeMode="contain" />
          </View>
        </View>
        <Text style={styles.name}>{name}</Text>
        <View>
          <View style={styles.subContainer}>
            <Text style={styles.label}>{symbol}</Text>
            <Text style={styles.valueLabel}>{balance}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.label}>{this.props.setting.currency}</Text>
            <Text style={styles.valueLabel}>{dollarFormat(fixed((balance * this.coin.price), 3))}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.label}>ADDRESS</Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.valueLabel}>{address}</Text>
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
    position: 'relative',
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
    marginBottom: 3,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  label: {
    color: 'white',
    fontSize: 12,
    textAlignVertical: 'bottom',
    opacity: 0.5,
  },
  valueLabel: {
    flex: 1,
    color: 'white',
    fontSize: 12,
    letterSpacing: -0.5,
    marginBottom: 4,
    marginLeft: 5,
  },
})
