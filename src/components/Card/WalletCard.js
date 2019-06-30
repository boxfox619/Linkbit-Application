import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import BorderCard from './BorderCard'

export default class WalletCard extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    moneySymbol: PropTypes.string.isRequired,
    address: PropTypes.string,
    balance: PropTypes.any,
    price: PropTypes.any,
    themeColor: PropTypes.string,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
  }

  static defaultProps = {
    balance: 0,
    price: 0,
    themeColor: PRIMARY_COLOR,
    onPress: () => { },
  }

  render() {
    return (
      <BorderCard
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        themeColor={this.props.themeColor}>
        <Text style={[styles.label, this.getTextColor()]}>{this.props.name}</Text>
        {this.props.address && (
          <View style={[styles.valuesWrapper, { marginTop: 0 }]}>
            <Text style={[this.getTextColor(), { fontSize: 10 }]}>{this.props.address}</Text>
          </View>
        )}
        <View style={styles.valuesWrapper}>
          <View style={styles.values}>
            <Text style={[styles.symbol, this.getTextColor()]}>{this.props.symbol}</Text>
            <Text style={[styles.value, this.getTextColor()]}>{this.props.balance}</Text>
          </View>
          <View style={[styles.values, { right: 0 }]}>
            <Text style={[styles.symbol, this.getTextColor()]}>{this.props.moneySymbol}</Text>
            <Text style={[styles.value, this.getTextColor()]}>{this.props.price}</Text>
          </View>
        </View>
      </BorderCard>
    )
  }

  getTextColor = () => {
    const themeColor = this.props.themeColor
    return { color: themeColor.length === 0 ? PRIMARY_COLOR : themeColor }
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  valuesWrapper: {
    position: 'relative',
    marginTop: 20,
  },
  values: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  value: {
    fontSize: 15,
  },
  symbol: {
    fontSize: 14,
    marginRight: 5,
  },
})
