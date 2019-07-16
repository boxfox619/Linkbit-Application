import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, FlatList } from 'react-native'
import { TransactionCard } from '../Card'

export default class TransactionList extends React.Component {

  static propTypes = {
    fetchTransaction: PropTypes.func.isRequired,
    refreshing: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      confirm: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      benefit: PropTypes.bool.isRequired,
    })),
    symbol: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    onLongSelect: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    refreshing: false,
    onSelect: () => { },
    onLongSelect: () => { },
  }

  onRefresh = () => {
    this.props.fetchTransaction()
  }

  render() {
    return (
      <FlatList
        style={[styles.transactionListView, this.props.style]}
        data={this.props.data}
        extraData={this.props.data.length}
        initialNumToRender={10}
        onEndReachedThreshold={1}
        refreshing={this.props.refreshing}
        onRefresh={this.onRefresh}
        keyExtractor={(item) => item.hash}
        renderItem={({ item }) => (
          <TransactionCard
            key={item.hash}
            symbol={this.props.symbol}
            transaction={item}
            onClick={() => this.props.onSelect(item.hash)}
            onLongPress={() => !!this.props.onLongSelect && this.props.onLongSelect(item.hash)} />
        )} />
    )
  }
}

const styles = StyleSheet.create({
  transactionListView: {
    borderStyle: 'dotted',
    width: '100%',
    margin: 0,
    marginTop: 20,
  },
})
