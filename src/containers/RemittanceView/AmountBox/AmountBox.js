import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class AmountBox extends React.Component {
  render () {
    return (
      <View style={styles.toAmountContainer}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.toAmountSymbol}>KRW</Text>
          <Text style={styles.toAmount}>8,080,468</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.toAmountSymbol}>ETH</Text>
          <Text style={styles.toAmount}>35.315</Text>
        </View>
      </View>
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
    fontSize: 14,
  },
  toAmount: {
    color: '#ffffff',
    fontSize: 14,
  },
})
