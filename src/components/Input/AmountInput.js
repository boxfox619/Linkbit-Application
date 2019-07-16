import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import DropdownMenu from 'react-native-dropdown-menu'
import { debounce } from 'lodash'
import { Input } from './Input'
import { withTitle } from '../HOC'

const AmountInput = (props) => {
  const { amount, price, symbol, selectedSymbol, moneySymbol, onChangeAmount, onChangeSymbol, edit, onPress } = props
  const symbols = [[symbol, moneySymbol]]
  const amountValue = selectedSymbol === symbol ? amount : price
  const onChangeAmountDebounce = debounce(onChangeAmount, 800)

  return (
    <View style={styles.amountContainer}>
      {edit ? (
        <>
          <Input
            placeholder='0'
            keyboardType='numeric'
            returnKeyType='done'
            containerStyle={{ flex: 1 }}
            defaultValue={String(amountValue)}
            onChangeText={text => onChangeAmountDebounce(text)} />
          <View style={styles.unitPicker}>
            <DropdownMenu
              bgColor="transparent"
              tintColor="#594343"
              activityTintColor="#594343"
              optionTextStyle={{ color: '#594343', backgroundColor: '#ffffff', zIndex: 2 }}
              titleStyle={{ color: '#594343' }}
              handler={(selection, row) => onChangeSymbol(symbols[selection][row])}
              data={symbols} />
          </View>
        </>
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.toAmountContainer}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.toAmountSymbol}>{moneySymbol}</Text>
            <Text style={styles.toAmount}>{price}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.toAmountSymbol}>{symbol}</Text>
            <Text style={styles.toAmount}>{amount}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

AmountInput.propTypes = {
  symbol: PropTypes.string.isRequired,
  moneySymbol: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedSymbol: PropTypes.string.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  onChangeSymbol: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    zIndex: 2,
  },
  unitPicker: {
    height: 53,
    width: 100,
    marginLeft: 6,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#594343',
  },
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

export default withTitle(AmountInput)