import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import SelectWalletView from './SelectWalletView/SelectWalletView'

export default class CreateWalletView extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <SelectWalletView />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  list: {
    paddingHorizontal: 20,
  }
})