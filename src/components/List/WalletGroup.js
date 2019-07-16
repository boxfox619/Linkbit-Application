import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react'
import { CoinCard, WalletCard } from '../Card'
import { dollarFormat, fixed } from '../../libs/NumberFormatter'
import Wallet from '../../store/Wallet/Wallet'

@inject('coin')
@observer
export default class WalletGroup extends React.Component {

  static propTypes = {
    activated: PropTypes.bool,
    coinSymbol: PropTypes.string.isRequired,
    moneySymbol: PropTypes.string.isRequired,
    wallets: PropTypes.arrayOf(PropTypes.instanceOf(Wallet)).isRequired,
    onToggled: PropTypes.func.isRequired,
    onWalletSelected: PropTypes.func,
    onWalletLongSelected: PropTypes.func,
  }

  static defaultProps = {
    activated: false,
    onWalletSelected: () => { },
    onWalletLongSelected: () => { },
  }

  get coin() {
    return this.props.coin.getCoin(this.props.coinSymbol)
  }

  get totalBalance() {
    let totalBalance = 0
    this.props.wallets.forEach(wallet => {
      totalBalance += parseFloat(wallet.balance, 10)
    })

    return totalBalance
  }

  renderWallets = (coin) => {
    return this.props.wallets.map(wallet => {
      return (
        <WalletCard
          key={wallet.address}
          name={wallet.name}
          symbol={wallet.symbol}
          moneySymbol={this.props.moneySymbol}
          balance={wallet.balance}
          themeColor={coin.themeColor}
          price={dollarFormat(fixed((wallet.balance * coin.price), 3))}
          onPress={() => this.props.onWalletSelected(wallet)}
          onLongPress={() => this.props.onWalletLongSelected && this.props.onWalletLongSelected(wallet)} />
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <CoinCard
          activate={this.props.activated}
          coinName={this.coin.name}
          themeColor={this.coin.themeColor}
          symbol={this.props.coinSymbol}
          moneySymbol={this.props.moneySymbol}
          balance={fixed(this.totalBalance, 3)}
          price={dollarFormat(fixed((this.totalBalance * this.coin.price), 3))}
          onClick={() => this.props.onToggled(this.props.coinSymbol)} />
        {this.props.activated && this.renderWallets(this.coin)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
})
