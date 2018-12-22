import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Provider } from 'mobx-react'
import Navigator from './src/containers/navigator'
import { WalletStore, CoinPriceStore, AddressStore } from './src/store'

const store = {
  wallet: WalletStore,
  coin: CoinPriceStore,
  address: AddressStore,
}
const AppContainer = createAppContainer(Navigator)

export default class App extends React.Component {
    componentWillMount() {
        store.address.loadAddressList()
        store.wallet.loadWalletList()
        store.coin.refreshCoins()
    }

  render () {
    return (
      <Provider {...store}>
        <View style={styles.container}>
          <AppContainer/>
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
