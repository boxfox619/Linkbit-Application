import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView, View} from 'react-native'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import WalletGroup from './WalletGroup'

@observer
export default class WalletList extends React.Component {
    @observable selectedCoin = undefined;
    static propTypes = {
      moneySymbol: PropTypes.string.isRequired,
      wallets: PropTypes.array.isRequired,
      onWalletSelected: PropTypes.func,
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
        const walletMap = this.groupBy(this.props.wallets, 'symbol')
        
        return Array.from(walletMap.keys()).map(symbol => {
          const wallets = walletMap.get(symbol)
          
          return (
            <WalletGroup
              key={symbol}
              activated={symbol === this.selectedCoin}
              coinSymbol={symbol}
              moneySymbol={this.props.moneySymbol}
              wallets={wallets}
              onToggled={() => {this.selectedCoin = symbol}}
              onWalletSelected={wallet => this.props.onWalletSelected(wallet)} />
          )
        })
      }
    };

    groupBy = (list, keyStr) => {
      const map = new Map()
      list.forEach((item) => {
        const key = item[keyStr]
        const collection = map.get(key)
        if (!collection) {
          map.set(key, [item])
        } else {
          collection.push(item)
        }
      })
      
      return map
    };
}