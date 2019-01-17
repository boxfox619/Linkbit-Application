import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, FlatList} from 'react-native'
import TransactionCard from '../Card/TransactionCard'

export default class TransactionList extends React.Component {

    static propTypes = {
        fetchTransaction: PropTypes.func.isRequired,
        refreshing: PropTypes.bool.isRequired,
        data: PropTypes.array.isRequired,
    }

    static defaultProps = {
        data: [],
        refreshing: false,
        fetchTransaction: () => {}
    }

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({refreshing: false})
        }
    }

    onEndReached = () => {
        this.props.fetchTransaction(this.state.page + 1, 10)
        this.setState(state => ({page: state.page + 1}))
    }

    onRefresh = () => {
        this.props.fetchTransaction(1, 10)
        this.setState({page: 1})
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
                    <TransactionCard transaction={item}/>
                )}/>
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
