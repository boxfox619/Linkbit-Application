import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import { CoinItem } from '../Card'

export default class SelectCoinListView extends React.Component {

    static propTypes = {
      coins: PropTypes.array.isRequired,
      selectedCoin: PropTypes.string,
      onSelectCoin: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired,
      style: PropTypes.object,
    }

    static defaultProps = {
      isLoading: false,
    }

    render() {
      const { coins, selectedCoin, onSelectCoin, isLoading, style } = this.props
      
      return (
        <View style={style}>
          <FlatList
            data={coins}
            extraData={selectedCoin}
            keyExtractor={(item) => item.symbol}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <CoinItem coin={item} activate={selectedCoin === item.symbol} onPress={() => onSelectCoin(item.symbol)} />
            )} />
        </View>
      )
    }
}