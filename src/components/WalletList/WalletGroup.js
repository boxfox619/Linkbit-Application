import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {CoinCard, WalletCard} from '../../components';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';

@inject(['coin'])
@observer
export default class WalletGroup extends React.Component {
    @observable totalBalance = 0;
    //@TODO lookup coin anme & price

    static propTypes = {
        activated: PropTypes.bool.isRequired,
        coinSymbol: PropTypes.string.isRequired,
        moneySymbol: PropTypes.string.isRequired,
        wallets: PropTypes.array.isRequired,
        onToggled: PropTypes.func.isRequired
    };

    static defaultProps = {
        activated: false
    };

    render() {
        const coin = this.props.coin.getCoin(this.props.coinSymbol);
        return (
            <View>
                <CoinCard activate={this.props.activated}
                          coinName={coin.name}
                          symbol={this.props.coinSymbol}
                          moneySymbol={this.props.moneySymbol}
                          balance={this.totalBalance}
                          price={this.totalBalance * coin.price}
                          onClick={() => this.setState({test: !this.state.test})}/>
                {this.props.activated && this.renderWallets()}
            </View>
        )
    }

    renderWallets = () => {
        return this.props.wallets.map(wallet => {
            this.totalBalance += wallet.balance;
            return (<WalletCard name={wallet.name}
                                symbol={wallet.symbol}
                                moneySymbol={this.props.moneySymbol}
                                balance={wallet.balance}
                                price={wallet.price}
            />);
        });
    }
}