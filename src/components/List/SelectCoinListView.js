import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, ViewPropTypes } from 'react-native'
import { CoinItem } from '../Card'

const SelectCoinListView = (props) => {
  const { coins, selectedCoin, onSelectCoin, isLoading, style } = props

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

SelectCoinListView.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })).isRequired,
  selectedCoin: PropTypes.string,
  onSelectCoin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  style: ViewPropTypes.style,
}

SelectCoinListView.defaultProps = {
  selectedCoin: undefined,
  isLoading: false,
  style: {},
}

export default SelectCoinListView