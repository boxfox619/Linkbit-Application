import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

export default class AddressInput extends React.Component {
  render () {
    const {address, onChangeText} = this.props

    return (
      <View style={styles.addressContainer}>
        <TextInput
          style={styles.addressInput}
          value={address}
          onChangeText={onChangeText}
          placeholder="Type address here" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#594343',
    borderRadius: 5,
    borderWidth: 3,
    height: 53,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  addressInput: {
    height: 47,
    fontSize: 14,
    flexGrow: 1,
    marginHorizontal: 6,
  },
})
