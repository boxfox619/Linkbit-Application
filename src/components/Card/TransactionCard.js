import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class TransactionCard extends React.Component {
  static propTypes = {
    transaction: PropTypes.shape({
      date: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      confirm: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      benefit: PropTypes.bool.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    onLongPress: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => { },
    onLongPress: () => { },
  }

  get amountColor() {
    if (this.props.transaction.benefit) {
      return { color: '#0088FF' }
    } else {
      return { color: 'red' }
    }
  }

  render() {
    const { date, address, amount, confirm, symbol, benefit } = this.props.transaction

    return (
      <TouchableOpacity onPress={this.props.onClick} onLongPress={this.props.onLongPress}>
        <View style={styles.transactionRow}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.accountContainer}>
            <Text style={styles.email}>unknown</Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.address}>{address}</Text>
          </View>
          <View style={styles.rightContainer}>
            <View style={[styles.amountContainer]}>
              <Text style={[styles.amount, this.amountColor, { maxWidth: 70 }]} numberOfLines={1} ellipsizeMode='tail'>
                {(benefit ? '+' : '-')}
                {` ${amount}`}
              </Text>
              <Text style={[styles.amount, this.amountColor]}>{symbol}</Text>
            </View>
            <Text style={styles.confirm}>{confirm}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  transactionRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 79,
  },
  date: {
    position: 'absolute',
    fontSize: 11,
    left: 0,
    top: 0,
  },
  accountContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '70%',
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  address: {
    fontSize: 9,
    color: '#555555',
    maxHeight: '70%',
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  confirm: {
    fontSize: 12,
    color: '#555555',
    textAlign: 'right',
  },
})
