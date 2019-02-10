import React from 'react'
import {View, StyleSheet} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {Provider} from 'mobx-react'
import Navigator from './src/containers/navigator'
import PinCodeView from './src/components/PinCodeInput'
import {WalletStore, CoinPriceStore, AddressStore, SettingStore} from './src/store'
import {checkForFingerprint} from './src/libs/Fingerprint'
import {observer} from 'mobx-react/index'
import {observable} from 'mobx/lib/mobx'

const store = {
  wallet: WalletStore,
  coin: CoinPriceStore,
  address: AddressStore,
  setting: SettingStore
}
const AppContainer = createAppContainer(Navigator)

@observer
export default class App extends React.Component {
  @observable label = 'PIN 번호를 입력해주세요'
  @observable isVerify = true

  componentDidMount() {
    store.address.loadAddressList()
    store.wallet.loadWalletList()
    store.coin.loadCoins()

    const {pin, useFingerprint} = store.setting
    if (useFingerprint) {
      this.isVerify = checkForFingerprint()
    } else if (pin) {
      this.isVerify = false
    }
  }

  handlePinVerify = inputPin => {
    const pin = store.setting.pin
    if (pin === inputPin) {
      this.isVerify = true
    } else {
      this.label = 'PIN 번호가 일치하지 않습니다'
    }
  }

  render() {
    return (
      <Provider {...store}>
        <View style={[styles.container, !this.isVerify && styles.paddingTop]}>
          {
            !this.isVerify ?
              <PinCodeView
                label={this.label}
                onComplete={this.handlePinVerify}
                pinLength={5}/> :
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
    backgroundColor: '#fff'
  },
  paddingTop: {
    paddingTop: 90
  }
})
