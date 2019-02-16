import React from 'react'
import { View, StyleSheet } from 'react-native'
import AddressBox from "../AddressBox/AddressBox";
import Input from "../../../components/Input/Input";

export default class AddressInput extends React.Component {
    render() {
        const {address, onChangeText, edit, onPress} = this.props

        return (
            <View style={styles.addressContainer}>
                {edit ? (
                    <Input
                        defaultValue={address}
                        onChangeText={onChangeText}
                        placeholder="Type address here"/>
                ) : (
                    <AddressBox address={address} onPress={onPress}/>
                )}
            </View>
        )
  }
}

const styles = StyleSheet.create({
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
})
