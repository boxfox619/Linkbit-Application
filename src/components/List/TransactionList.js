import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, FlatList} from 'react-native'
import TransactionCard from '../Card/TransactionCard'

export default class TransactionList extends React.Component {

    static propTypes = {
        fetchTransaction: PropTypes.func.isRequired,
        refreshing: PropTypes.bool.isRequired,
        data: PropTypes.array.isRequired,
        symbol: PropTypes.string.isRequired
    }

    static defaultProps = {
        data: [],
        refreshing: false
    }

    onEndReached = () => {
        this.props.fetchTransaction()
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
                onEndReached={this.onEndReached}
                refreshing={this.props.refreshing}
                onRefresh={this.onRefresh}
                keyExtractor={(item) => item.hash}
                renderItem={({item}) => (
                    <TransactionCard key={item.hash} symbol={this.props.symbol} transaction={item}/>
                )}/>
        )
    }

    componentDidMount() {
        if(this.props.data.length === 0){
            this.props.fetchTransaction()
        }
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
