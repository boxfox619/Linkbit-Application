import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import WalletCard from '../../components/Card/WalletCard'

@inject(['wallet'])
@observer
export default class WalletSearchView extends React.Component {
  @observable wallets

  componentDidMount () {
    this.onChangeText()
  }

  onChangeText = (text) => {
    const {params} = this.props.navigation.state
    const excludeAddressList = params.excludeAddressList || []
    const excludeSymbolList = params.excludeSymbolList || []
    let resultWallets = this.props.wallet.wallets
    if (!!text && text.length > 0) {
      text = text.toLowerCase()
      resultWallets = resultWallets.filter(w => (
        w.address.toLowerCase().includes(text) ||
        w.linkedAddress.toLowerCase().includes(text) ||
        w.name.toLowerCase().includes(text)
      ))
    }
    this.wallets = resultWallets.filter(w => excludeSymbolList.indexOf(w.symbol) === -1).filter(w => excludeAddressList.indexOf(w.address) === -1)
  }

  onWalletSelected = (wallet) => {
      const {onWalletSelected} = this.props.navigation.state.params
      onWalletSelected(wallet)
      this.props.navigation.goBack(null)
  }

  render () {
    return (
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          onChangeText={this.onChangeText}
          onClearText={this.onChangeText}
          placeholder={i18n('search_wallet')}/>
        <FlatList
          style={styles.list}
          data={this.wallets}
          keyExtractor={(item) => item.address}
          renderItem={({item}) => {
            return (
              <WalletCard
                name={item.address}
                symbol={item.symbol}
                moneySymbol="KRW"
                onPress={() => this.onWalletSelected(item)}/>
            )
          }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 10,
  },
})
