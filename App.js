import React from 'react'
import {StyleSheet, View} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {Provider} from 'mobx-react'
import Navigator from './src/containers/navigator'
import {WalletStore, CoinPriceStore, AddressStore, SettingStore} from './src/store'
import {checkForFingerprints} from './src/libs/Fingerprint'

const store = {
    wallet: WalletStore,
    coin: CoinPriceStore,
    address: AddressStore,
    setting: SettingStore
}
const AppContainer = createAppContainer(Navigator)

export default class App extends React.Component {
    componentDidMount() {
      const {pin, useFingerprint} = store.setting

      store.address.loadAddressList()
      store.wallet.loadWalletList()
      store.coin.loadCoins()

      //TODO if use fingerprint or pin
      useFingerprint && checkForFingerprints()
    }

    render() {
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
