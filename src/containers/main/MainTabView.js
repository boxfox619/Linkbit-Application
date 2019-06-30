import React from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import { Header } from 'react-native-elements'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CommonStyle from '../../libs/CommonStyle'
import { Navbar } from '../../components'
import WalletListView from './WalletListView'
import SettingView from './SettingView'
import i18n from '../../libs/Locale'
import AddressListView from './AddressListView'

export default class MainTabView extends React.Component {
    static navigationOptions = { header: null }

    constructor() {
      super()
      this.state = {
        selectedIndex: 0,
        headerTitle: 'WALLET',
        headerIcon: {},
      }
    }

    render() {
      const { headerTitle, headerIcon, selectedIndex } = this.state

      return (
        <React.Fragment>
          <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
          <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
            <View style={styles.container}>
              <Header
                backgroundColor="#ffffff"
                leftComponent={<Text style={styles.title}>{i18n.t(headerTitle)}</Text>}
                rightComponent={headerIcon}
                outerContainerStyles={{ borderBottomWidth: 0, height: 80 }} />
              {
                this.renderContents()
              }
              <Navbar
                onTabSelected={this.updateIndex}
                selectedIndex={selectedIndex}
                tabs={this.tabs}
                containerStyle={styles.containerStyle} />
            </View>
          </SafeAreaView>
        </React.Fragment>
      )
    }

    componentDidMount() {
      this.updateIndex(0)
    }

    renderContents = () => {
      switch (this.state.selectedIndex) {
      case 0:
        return <WalletListView navigation={this.props.navigation} />
      case 1:
        return <AddressListView navigation={this.props.navigation} />
      case 2:
        return <SettingView navigation={this.props.navigation} />
      }
    }

    get tabs() {
      return [
        { icon: 'payment', label: i18n.t('wallet') },
        { icon: 'swap-horiz', label: i18n.t('address') },
        { icon: 'settings', label: i18n.t('setting') },
      ]
    }

    updateIndex = (selectedIndex) => {
      const state = { selectedIndex }
      switch (selectedIndex) {
      case 0:
        state.headerTitle = 'wallet'
        state.headerIcon = undefined
        break
      case 1:
        state.headerTitle = 'address'
        state.headerIcon = undefined
        break
      case 2:
        state.headerTitle = 'setting'
        state.headerIcon = undefined
        break
      }
      this.setState(state)
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  containerStyle: {
    height: 60,
    backgroundColor: PRIMARY_COLOR,
  },
})
