import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class AddressBox extends React.Component {
  render () {
    const {address} = this.props

    return (
      <View style={styles.toAddressContainer}>
        <Text style={styles.toAddressText}>{address}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  toAddressContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  toAddressText: {
    fontSize: 14,
    color: '#ffffff',
  },
})
