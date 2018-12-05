import React from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import { Header } from 'react-native-elements'
import WalletListView from './WalletListView'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import { Navbar } from '../../components'
import TransactionsView from '../TransactionsView/TransactionsView'
import RemittanceView from '../RemittanceView/RemittanceView'
import RemmittanceResultCard from '../../components/RemittanceResultCard/RemittanceResultCard'

export default class MainTabView extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
      headerTitle: 'WALLET',
      headerIcon: {},
    }
  }

  render() {
    const { selectedIndex } = this.state
    
    return (
      <SafeAreaView style={styles.safeArea}>
        {/* <RemmittanceResultCard symbol={'ETH'}
                balance={'35.124'}
                linkedAddress={'6abnbexlai13tbajfldxze'}
                accountAddress={'나의 이더리움 지갑 1'} /> */}
        <RemittanceView />
        {/* <SafeAreaView style={styles.safeArea}>
                    <View style={styles.container}>
                        <Header
                            backgroundColor={'#ffffff'}
                            leftComponent={<Text style={styles.title}>{this.state.headerTitle}</Text>}
                            rightComponent={this.state.headerIcon}
                            outerContainerStyles={{ borderBottomWidth: 0, height: 80 }}
                        />
                        <View style={styles.content}>
                            {this.renderContents()}
                        </View>
                        <Navbar
                            onTabSelected={this.updateIndex}
                            selectedIndex={selectedIndex}
                            tabs={this.tabs}
                            containerStyle={styles.containerStyle}
                        />
                    </View>
                </SafeAreaView> */}
      </SafeAreaView>
    )
  }

    renderContents = () => {
      switch (this.state.selectedIndex) {
      case 0:
        return <WalletListView />
      case 1:
        return <TransactionsView />
      case 2:
        return <View />
      }
    }

    get tabs() {
      return [
        { icon: 'payment', label: 'Wallet' },
        { icon: 'swap-horiz', label: 'Transaction' },
        { icon: 'settings', label: 'Settings' },
      ]
    }

    updateIndex = (selectedIndex) => {
      const state = { selectedIndex }
      switch (selectedIndex) {
      case 0:
        state.headerTitle = 'WALLET'
        state.headerIcon = { icon: 'payment', color: '#000000', marginRight: 10 }
        break
      case 1:
        state.headerTitle = 'TRANSACTION'
        state.headerIcon = undefined
        break
      case 2:
        state.headerTitle = 'SETTING'
        state.headerIcon = undefined
        break
      }
      this.setState(state)
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