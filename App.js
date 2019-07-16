import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Provider } from 'mobx-react'
import { observer } from 'mobx-react'
import { observable } from 'mobx/lib/mobx'
import Navigator from './src/containers/navigator'
import { SplashView, GuideView } from './src/containers/guide'
import withVerify from './src/components/HOC/withVerify'
import i18n from './src/libs/Locale'
import { createStore } from './src/store';

const AppContainer = withVerify(createAppContainer(Navigator), true)

@observer
export default class App extends React.Component {
  @observable isVerify = true
  @observable progress = true
  @observable label = i18n.t('loading')
  store

  constructor(props) {
    super(props)
    this.store = createStore()
  }

  componentDidMount = async () => {
    try {
      this.label = i18n.t('loading_setting')
      await this.store.setting.load()
      this.label = i18n.t('loading_address')
      await this.store.address.loadAddressList()
      this.label = i18n.t('loading_wallet')
      await this.store.wallet.loadWalletList()
      this.label = i18n.t('loading_coin')
      await this.store.coin.load()
      this.label = i18n.t('loading_finish')
      this.progress = false
    } catch (err) {
      this.label = i18n.t('loading_fail')
    }
  }

  render() {
    return (
      <Provider {...this.store}>
        <View style={[styles.container, !this.isVerify && styles.paddingTop]}>
          {(this.progress) ? (<SplashView label={this.label} />) : (
            this.store.setting.isInitialExecution ? (<GuideView />) : (<AppContainer />)
          )}
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
  paddingTop: {
    paddingTop: 90,
  },
})
