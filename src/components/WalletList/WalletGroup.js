import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {CoinCard, WalletCard} from '../../components';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

@observer
export default class WalletGroup extends React.Component {
    @observable totalBalance = 0;
    @observable coinName = '';
    @observable coinPrice = 0;
    //@TODO lookup coin anme & price

    static propTypes = {
        activated: PropTypes.bool.isRequired,
        coinSymbol: PropTypes.string.isRequired,
        moneySymbol: PropTypes.string.isRequired,
        wallets: PropTypes.array.isRequired,
        onToggled: PropTypes.func.isRequired
    }

    static defaultProps = {
        activated: false
    }

    render() {
        return (
            <View>
                <CoinCard activate={this.props.activated}
                          coinName={this.coinName}
                          symbol={this.props.coinSymbol}
                          moneySymbol={this.props.moneySymbol}
                          balance={this.totalBalance}
                          price={this.totalBalance * this.coinPrice}
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