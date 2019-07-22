import React from 'react'
import i18n from './src/libs/Locale'
import { Provider } from 'mobx-react'
import { createStore } from './src/store'
import { View, StyleSheet } from 'react-native'
import { SplashView, GuideView } from './src/routes/guide'
import withVerify from './src/components/HOC/withVerify'
import AppNavigator from './src/routes'

const Container = withVerify(AppNavigator, true)
const store = createStore()
const App = () => {
  const [progress, setProgress] = React.useState(false);
  const [label, setLabel] = React.useState('');
  React.useEffect(async () => {
    try {
      setLabel(i18n.t('loading_setting'));
      await store.setting.load()
      setLabel(i18n.t('loading_address'));
      await store.address.loadAddressList()
      setLabel(i18n.t('loading_wallet'));
      await store.wallet.loadWalletList()
      setLabel(i18n.t('loading_coin'));
      await store.coin.load()
      setLabel(i18n.t('loading_finish'));
      setProgress(false)
    } catch (err) {
      setLabel(i18n.t('loading_fail'))
    }
  }, []);
  return (
    <Provider {...store}>
      <View style={[styles.container]}>
        {(progress) ? (<SplashView label={label} />) : (
          store.setting.isInitialExecution ? (<GuideView />) : (<Container />)
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default App;
