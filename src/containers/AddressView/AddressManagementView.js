import React from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react/index'
import i18n from '../../libs/Locale'
import WalletCard from '../../components/Card/WalletCard'
import AddressCard from '../../components/Card/AddressCard'

@inject(['address'])
@observer
export default class AddressManagementView extends React.Component {

  static get options () {
    return {topBar: {title: {text: '주소 관리'}}}
  }

  render () {
    return (
      <View style={styles.container}>
        <AddressCard address={this.currentAddressItem.address} linkedAddressCount={this.currentAddressItem.accountAddressList.length} activate />
        <FlatList
          style={styles.list}
          data={this.currentAddressItem.accountAddressList}
          extraData={{size: this.currentAddressItem.accountAddressList.length}}
          keyExtractor={(item) => item.address}
          renderItem={({item}) => {
            return (<WalletCard onPress={() => this.onWalletPressed(item)} name={item.address} symbol={item.symbol} moneySymbol="KRW" />)
          }} />
        <Button
          title={i18n.t('add_wallet')}
          buttonStyle={styles.getAddressButton}
          onPress={() => this.onLinkNewWallet()} />
      </View>
    )
  }

  get currentAddressItem () {
    const address = this.props.navigation.state.params.address

    return this.props.address.linkedAddressList.find(a => a.address === address)
  }

  onLinkNewWallet = () => {
    this.props.navigation.navigate({
      routeName: 'WalletSearch',
      params: {
        excludeSymbolList: this.currentAddressItem.accountAddressList.map(a => a.symbol),
        onWalletSelected: this.addWallet,
      },
    })
  }

  addWallet = (wallet) => {
    this.currentAddressItem.addAddress(wallet.symbol, wallet.address)
  }

  deleteWallet = (wallet) => {
    this.currentAddressItem.deleteAddress(wallet.symbol, wallet.address)
  }

  onWalletPressed = (wallet) => {
    Alert.alert(
      `${(i18n.t('wallet')+' '+ i18n.t('delete')).toLowerCase()}`,
      `${i18n.t('wallet_delete')}`,
      [
        {text: `${i18n.t('cancel')}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: `${i18n.t('ok')}`, onPress: () => this.deleteWallet(wallet)},
      ],
      {cancelable: false},
    )
  }

  onBack = () => {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flex: 1,
  },
})
