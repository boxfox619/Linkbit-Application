import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import CoinItem from '../Card/CoinItem'

export default class SelectCoinView extends React.Component {

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
      const {coins, selectedCoin, onSelectCoin, isLoading, style} = this.props
      
      return (
        <View style={style}>
          <FlatList
            data={coins}
            extraData={selectedCoin}
            keyExtractor={(item, index) => item.symbol}
            refreshing={isLoading}
            renderItem={({item, index}) => (
              <CoinItem
                name={item.name}
                symbol={item.symbol}
                themeColor={item.themeColor}
                activate={selectedCoin === item.symbol}
                onPress={() => onSelectCoin(item.symbol)} />
            )} />
        </View>
      )
    }
}