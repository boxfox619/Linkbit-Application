import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { WalletList } from '../../components'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CommonStyle from '../../libs/CommonStyle'
import ActionButton from 'react-native-action-button'
import i18n from '../../libs/Locale'

@inject('wallet', 'setting')
@observer
export default class WalletListView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      test: false,
      linkedAddress: 'Linkbit-3156-3266',
      moneySymbol: 'KRW',
    }
  }

  openWalletDetail = (wallet) => {
    this.props.navigation.navigate('WalletDetail', { wallet })
  }

  render () {
    return (
      <View style={[styles.container, CommonStyle.mainTabViewContent]}>
        <View style={styles.totalBalanceCard}>
          <Text style={styles.totalBalanceLabel}>{i18n.t('wallet_total')}</Text>
          <Text style={styles.totalBalanceAddressLabel}>{this.state.linkedAddress}</Text>
          <View style={styles.balanceGroup}>
            <Text style={styles.balance}>{this.props.wallet.totalPrice}</Text>
            <Text style={styles.moneySymbol}>{this.props.setting.currency}</Text>
          </View>
        </View>
        <WalletList
          moneySymbol={this.state.moneySymbol}
          wallets={this.props.wallet.walletList}
          onWalletSelected={w => this.openWalletDetail(w)} />
        <ActionButton buttonColor={PRIMARY_COLOR}
          onPress={() => this.props.navigation.navigate("CreateWallet.SelectWalletCoin")}
          offsetX={20}
          offsetY={20} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  totalBalanceCard: {
    backgroundColor: PRIMARY_COLOR,
    padding: 17,
    borderRadius: 6,
    marginBottom: 10,
  },
  totalBalanceLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalBalanceAddressLabel: {
    color: '#ffffff',
    fontSize: 14,
  },
  balanceGroup: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 17,
    top: 0,
    bottom: 0,
  },
  balance: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 7,
  },
  moneySymbol: {
    color: '#ffffff',
    fontSize: 14,
  },
})
