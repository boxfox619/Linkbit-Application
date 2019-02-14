import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet} from 'react-native'
import {CoinCard, WalletCard} from '..'
import {observer, inject} from 'mobx-react'
import {observable, runInAction} from 'mobx'
import {dollarFormat} from '../../libs/NumberFormatter'

@inject('coin')
@observer
export default class WalletGroup extends React.Component {

    static propTypes = {
        activated: PropTypes.bool.isRequired,
        coinSymbol: PropTypes.string.isRequired,
        moneySymbol: PropTypes.string.isRequired,
        wallets: PropTypes.array.isRequired,
        onToggled: PropTypes.func.isRequired,
        onWalletSelected: PropTypes.func,
    }

    static defaultProps = {
        activated: false,
        onWalletSelected: () => {
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            coin: this.props.coin.getCoin(this.props.coinSymbol),
        }
    }

    render() {
        const {coin} = this.state
        return (
            <View style={styles.container}>
                <CoinCard
                    activate={this.props.activated}
                    coinName={coin.name}
                    themeColor={coin.themeColor}
                    symbol={this.props.coinSymbol}
                    moneySymbol={this.props.moneySymbol}
                    balance={this.totalBalance.toFixed(3)}
                    price={dollarFormat((this.totalBalance * coin.price).toFixed(3))}
                    onClick={() => this.props.onToggled(this.props.coinSymbol)}/>
                {this.props.activated && this.renderWallets(coin)}
            </View>
        )
    }

    get totalBalance() {
        let totalBalance = 0
        this.props.wallets.forEach(wallet => {
            totalBalance += wallet.balance
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
                    price={dollarFormat((wallet.balance * coin.price).toFixed(3))}
                    onPress={() => this.props.onWalletSelected(wallet)}/>
            )
        })
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
    },
})
