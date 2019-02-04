import React from 'react'
import {StyleSheet, View} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {Provider} from 'mobx-react'
import Navigator from './src/containers/navigator'
import PinCodeView  from './src/components/PinCodeInput'
import {WalletStore, CoinPriceStore, AddressStore, SettingStore} from './src/store'
import {checkForFingerprints} from './src/libs/Fingerprint'
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

      const saveFingerPrint = store.setting.getFingerprint()
      const savePin = store.setting.getPin()
      if(saveFingerPrint) {
        this.isVerify = checkForFingerprints()
      } else if(savePin) {
        this.isVerify = false
      }
    }

  onPinVerify =  pin => {
    const savePin =  store.setting.getPin()
    //TODO 왜 savePin 안 나올까요..?
    if (savePin === pin) {
      this.isVerify = true
    } else {
      this.label = 'PIN 번호가 일치하지 않습니다'
    }
  }

    render() {
      return (
            <Provider {...store}>
                <View style={styles.container}>
                  {
                    !this.isVerify ?
                      <PinCodeView
                        label={this.label}
                        onComplete={(val, clear) => this.onPinVerify(val, clear())}
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
        backgroundColor: '#fff',
    },
})
