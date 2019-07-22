import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Input } from './Input'
import { withTitle } from '../HOC'

const AddressInput = (props) => {
  const { address, onChangeText, edit, onPress } = props

  return (
    <View style={styles.addressContainer}>
      {edit ? (
        <Input
          returnKeyType='done'
          defaultValue={address}
          onChangeText={onChangeText}
          placeholder="Type address here" />
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.toAddressContainer}>
          <Text style={styles.toAddressText}>{address}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
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

export default withTitle(AddressInput)
