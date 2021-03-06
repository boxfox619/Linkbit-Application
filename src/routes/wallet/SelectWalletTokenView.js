import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import SelectCoinView from './SelectCoinView'
import { NavigationButton } from '../../components/Button'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CommonStyle from '../../libs/CommonStyle'
import i18n from '../../libs/Locale'

export default class SelectWalletTokenView extends React.Component {
  state = {
    selectedCoinSymbol: undefined,
    parentCoin: undefined,
  }

  componentDidMount() {
    const parentCoin = this.props.navigation.getParam('coin', {})
    this.setState({ parentCoin })
  }

  navigateToNext = () => {
    const { parentCoin, selectedCoinSymbol } = this.state
    const selectedCoin = parentCoin.subCoins.find(coin => coin.symbol === selectedCoinSymbol)

    if (!selectedCoin) {
      alert(i18n('select_coin'))

      return
    }

    this.props.navigation.navigate('InputWalletDetail', { coin: selectedCoin })
  }

  render() {
    const { selectedCoinSymbol, parentCoin } = this.state
    const coins = parentCoin ? parentCoin.subCoins : undefined

    return (
      <React.Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
        <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
          <View style={styles.container}>
            <SelectCoinView
              coins={coins}
              style={styles.list}
              selectedCoin={selectedCoinSymbol}
              onSelectCoin={symbol => this.setState({ selectedCoinSymbol: symbol })} />
            <NavigationButton
              title={i18n('next')}
              onPress={this.navigateToNext} />
          </View>
        </SafeAreaView>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  list: {
    height: '100%',
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
})
