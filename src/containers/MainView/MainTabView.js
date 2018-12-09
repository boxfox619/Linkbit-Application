import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Header } from 'react-native-elements'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import { Navbar } from '../../components'
import TransactionListView from '../TransactionListView/TransactionListView'
import WalletListView from './WalletListView'
import SettingView from '../SettingView/SettingView'
import i18n from '../../libs/Locale'

export default class MainTabView extends React.Component {

  static navigationOptions = {header: null}

  constructor () {
    super()
    this.state = {
      selectedIndex: 0,
      headerTitle: 'WALLET',
      headerIcon: {},
    }
  }

  componentDidMount () {
    this.updateIndex(0)
  }

  renderContents = () => {
    switch (this.state.selectedIndex) {
      case 0:
        return <WalletListView/>
      case 1:
        return <TransactionListView/>
      case 2:
        return <SettingView/>
    }
  }

  get tabs () {
    return [
      {icon: 'payment', label: 'Wallet'},
      {icon: 'swap-horiz', label: 'Transaction'},
      {icon: 'settings', label: 'Settings'},
    ]
  }

  updateIndex = (selectedIndex) => {
    const state = {selectedIndex}
    switch (selectedIndex) {
      case 0:
        state.headerTitle = 'wallet'
        state.headerIcon = {icon: 'payment', color: '#000000', marginRight: 10, onPress: () => this.props.navigation.navigate('Address')}
        break
      case 1:
        state.headerTitle = 'transaction'
        state.headerIcon = undefined
        break
      case 2:
        state.headerTitle = 'setting'
        state.headerIcon = undefined
        break
    }
    this.setState(state)
  }

  render () {
    const {headerTitle, selectedIndex} = this.state

    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#ffffff"
          leftComponent={<Text style={styles.title}>{i18n.t(headerTitle)}</Text>}
          rightComponent={this.state.headerIcon}
          outerContainerStyles={{borderBottomWidth: 0, height: 80}}/>
        <View style={styles.content}>
          {this.renderContents()}
        </View>
        <Navbar
          onTabSelected={this.updateIndex}
          selectedIndex={selectedIndex}
          tabs={this.tabs}
          containerStyle={styles.containerStyle}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  containerStyle: {
    height: 60,
    backgroundColor: PRIMARY_COLOR,
  },
})
