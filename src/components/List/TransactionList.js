import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, FlatList } from 'react-native'
import TransactionCard from '../Card/TransactionCard'

export default class TransactionList extends React.Component {

  static propTypes = {
    fetchTransaction: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
  }

  static defaultProps = {
    data: [],
  }

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      page: 1,
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data !== nextProps.data) {
      this.state({refreshing: false})
    }
  }

  onEndReached = () => {
    this.props.fetchTransaction(this.state.page + 1, 10)
    this.setState(state => ({page: state.page + 1, refreshing: true}))
  }

  onRefresh = () => {
    this.props.fetchTransaction(1, 10)
    this.setState({page: 1, refreshing: true})
  }

  render () {
    return (
      <FlatList
        style={styles.transactionListView}
        data={this.props.data}
        initialNumToRender={10}
        onEndReachedThreshold={1}
        onEndReached={this.onEndReached}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TransactionCard
            date={item.date}
            email={item.email}
            address={item.address}
            amount={item.coin}
            symbol={item.symbol}
            confirm={item.confirm} />
        )} />
    )
  }
}

const styles = StyleSheet.create({
  transactionListView: {
    backgroundColor: 'red',
    borderStyle: 'dotted',
    width: '100%',
    margin: 0,
    marginTop: 20,
  },
})
