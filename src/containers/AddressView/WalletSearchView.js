import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import SearchBar from '../../components/SearchBar/SearchBar'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import WalletCard from '../../components/Card/WalletCard'
import i18n from '../../libs/Locale'

@inject(['wallet'])
@observer
export default class WalletSearchView extends React.Component {
  @observable wallets

  static navigationOptions = () => {
    return {
      title: 'Searching wallet',
      headerTitleStyle: { color: 'black' },
      headerStyle: { backgroundColor: 'white' },
    }
  }

  componentDidMount() {
    this.onChangeText()
  }

  onChangeText = (text) => {
    const { params } = this.props.navigation.state
    const excludeAddressList = params.excludeAddressList || []
    const excludeSymbolList = params.excludeSymbolList || []
    let resultWallets = this.props.wallet.wallets

    // check wallets is empty
    if (!resultWallets) return

    if (!!text && text.length > 0) {
      text = text.toLowerCase()
      resultWallets = resultWallets.filter(w => {
        let isMatched = false

        const a = w.address
        if (a && a.toLowerCase().includes(text))
          isMatched = true

        const l = w.linkedAddress
        if (l && l.toLowerCase().includes(text))
          isMatched = true

        const n = w.address
        if (n && n.toLowerCase().includes(text))
          isMatched = true

        return isMatched
      })
    }

    this.wallets = resultWallets.filter(w => excludeSymbolList.indexOf(w.symbol) === -1).filter(w => excludeAddressList.indexOf(w.address) === -1)
  }

  onWalletSelected = (wallet) => {
    const { onWalletSelected } = this.props.navigation.state.params
    onWalletSelected(wallet)
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={this.onChangeText}
          onClearText={this.onChangeText}
          placeholder={i18n.t('search_wallet')}/>
        <Text style={styles.header}>{i18n.t('address_list')}</Text>
        <FlatList
          style={styles.list}
          data={this.wallets}
          keyExtractor={(item) => item.address}
          renderItem={({ item }) => {
            return (
              <WalletCard
                name={item.address}
                symbol={item.symbol}
                moneySymbol="KRW"
                onPress={() => this.onWalletSelected(item)} />
            )
          }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 2
  },
  list: {
    flex: 1,
  },
})
