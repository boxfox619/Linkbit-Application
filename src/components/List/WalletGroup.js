import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {CoinCard, WalletCard} from '../../components';
import {dollarFormat} from '../../libs/NumberFormatter';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';

@inject('coin')
@observer
export default class WalletGroup extends React.Component {
    @observable totalBalance = 0;

    static propTypes = {
        activated: PropTypes.bool.isRequired,
        coinSymbol: PropTypes.string.isRequired,
        moneySymbol: PropTypes.string.isRequired,
        wallets: PropTypes.array.isRequired,
        onToggled: PropTypes.func.isRequired,
        onWalletSelected: PropTypes.func
    };

    static defaultProps = {
        activated: false,
        onWalletSelected: () => {
        }
    };

    constructor(props) {
        super(props);
        props.wallets.forEach(wallet => {
            this.totalBalance += wallet.balance;
        });
        this.state = {
            coin: this.props.coin.getCoin(this.props.coinSymbol)
        }
    }

    render() {
        const {coin} = this.state;
        return (
            <View style={styles.container}>
                <CoinCard activate={this.props.activated}
                          coinName={coin.name}
                          symbol={this.props.coinSymbol}
                          moneySymbol={this.props.moneySymbol}
                          balance={this.totalBalance.toString()}
                          price={dollarFormat(this.totalBalance * coin.price)}
                          onClick={() => this.props.onToggled(this.props.coinSymbol)}/>
                {this.props.activated && this.renderWallets(coin.price)}
            </View>
        )
    }

    renderWallets = (price) => {
        return this.props.wallets.map(wallet => {
            return (
                <WalletCard
                    key={wallet.address}
                    name={wallet.name}
                    symbol={wallet.symbol}
                    moneySymbol={this.props.moneySymbol}
                    balance={wallet.balance.toString()}
                    price={dollarFormat(wallet.balance * price)}
                    onPress={() => this.props.onWalletSelected(wallet)}
                />
            );
        });
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5
    }
});