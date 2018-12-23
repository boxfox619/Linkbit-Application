import React from 'react'
import {StyleSheet, View} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {Provider} from 'mobx-react'
import Navigator from './src/containers/Navigator'
import {UserStore, WalletStore, CoinPriceStore, AddressStore} from './src/store'
import SecurityView from './src/containers/SecurityView/SecurityView'

export default class App extends React.Component {
  store = {
    user: UserStore,
    wallet: WalletStore,
    coin: CoinPriceStore,
    address: AddressStore,
  }
  state = {
    isLocked: this.store.user.getIsLocked
  }

  componentWillMount() {
    const { address, wallet, coin } = this.store

    address.loadAddressList()
    wallet.loadWalletList()
    coin.refreshCoins()
  }

  handleUnlocked = () => {
    this.setState({
      isLocked: false
    })
  }

  render() {
    const AppContainer = createAppContainer(Navigator)

    return (
      <Provider {...this.store}>
        <View style={styles.container}>
          {
            this.state.isLocked ?
              <SecurityView isLocked
                            isUnlocked={this.handleUnlocked}
                            getFingerPrint={this.store.getFingerPrint}/> :
              <AppContainer/>
          }
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
