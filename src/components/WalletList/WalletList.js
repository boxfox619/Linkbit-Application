import React from 'react';
import PropTypes from 'prop-types';
import WalletGroup from './WalletGroup';
import {ScrollView, View} from 'react-native';
import {observable} from 'mobx';

export default class WalletList extends React.Component {
    @observable selectedCoin = undefined;
    static propTypes = {
        moneySymbol: PropTypes.string.isRequired,
        wallets: PropTypes.array.isRequired,
        onWalletSelected: PropTypes.func
    };


    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    {this.renderWalletList()}
                </ScrollView>
            </View>
        )
    }

    renderWalletList = () => {
        if (this.props.wallets && this.props.wallets.length > 0) {
            this.groupBy(this.props.wallets, 'symbol').map(wallets => {
                const symbol = wallets[0].symbol;
                return (<WalletGroup activated={symbol === this.selectedCoin}
                                     coinSymbol={symbol}
                                     moneySymbol={this.props.moneySymbol}
                                     wallets={wallets}
                                     onToggled={() => this.selectedCoin = symbol}
                                     onWalletSelected={wallet => this.props.onWalletSelected(wallet)}/>)
            })
        }
    };

    groupBy = (list, keyStr) => {
        const map = new Map();
        list.forEach((item) => {
            const key = item[keyStr];
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    };
}