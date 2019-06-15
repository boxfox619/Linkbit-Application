import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Provider } from 'mobx-react'
import Navigator from './src/containers/navigator'
import PinCodeView from './src/components/PinCodeInput'
import SplashView from './src/containers/GuideView/SplashView'
import { WalletStore, CoinPriceStore, AddressStore, SettingStore } from './src/store'
import { handleError } from "./src/libs/ErrorHandler"
import { observer } from 'mobx-react'
import { observable } from 'mobx/lib/mobx'
import i18n from './src/libs/Locale'
import TouchID from 'react-native-touch-id'

const store = {
  wallet: WalletStore,
  coin: CoinPriceStore,
  address: AddressStore,
  setting: SettingStore
}
const AppContainer = createAppContainer(Navigator)

@observer
export default class App extends React.Component {
  @observable label = i18n.t('pin_verify')
  @observable isVerify = true
  @observable progress = true

  componentDidMount() {
    Promise.all([
      store.address.loadAddressList(),
      store.wallet.loadWalletList(),
      store.coin.load(),
      store.setting.load()
    ]).then(() => {
      const { pin, useFingerprint } = store.setting
      if (useFingerprint) {
        TouchID.authenticate('to demo this react-native component')
          .then(success => {
            this.isVerify = true
          }).catch(error => {
            this.isVerify = false
          });
      } else if (pin) {
        this.isVerify = false
      }
      this.progress = false
    }).catch(err => {
      handleError(err)
    })
  }

  handlePinVerify = inputPin => {
    const pin = store.setting.pin
    if (pin === inputPin) {
      this.isVerify = true
    } else {
      this.label = i18n.t('wrong_pin')
    }
  }

  render() {
    return (
      <Provider {...store}>
        <View style={[styles.container, !this.isVerify && styles.paddingTop]}>
          {this.progress ? (
            <SplashView />
          ) : (
              !this.isVerify ?
                <PinCodeView
                  label={this.label}
                  onComplete={this.handlePinVerify}
                  pinLength={5} /> :
                <AppContainer />
            )}
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
