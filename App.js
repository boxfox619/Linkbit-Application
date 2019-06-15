import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Provider } from 'mobx-react'
import Navigator from './src/containers/navigator'
import SplashView from './src/containers/GuideView/SplashView'
import { WalletStore, CoinPriceStore, AddressStore, SettingStore } from './src/store'
import { observer } from 'mobx-react'
import { observable } from 'mobx/lib/mobx'
import withVerify from './src/components/HOC/withVerify';

const store = {
  wallet: WalletStore,
  coin: CoinPriceStore,
  address: AddressStore,
  setting: SettingStore
}
const AppContainer = withVerify(createAppContainer(Navigator), true)

@observer
export default class App extends React.Component {
  @observable isVerify = true
  @observable progress = true

  componentDidMount = async () => {
    await store.setting.load()
    await store.address.loadAddressList()
    await store.wallet.loadWalletList()
    await store.coin.load()
    this.progress = false
  }

  render() {
    return (
      <Provider {...store}>
        <View style={[styles.container, !this.isVerify && styles.paddingTop]}>
          {(this.progress) ? (<SplashView />) : (<AppContainer />)}
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  paddingTop: {
    paddingTop: 90
  }
})
