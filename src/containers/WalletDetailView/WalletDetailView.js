import React from 'react'
import { View, StyleSheet } from 'react-native'
import { WalletSummaryCard, TransactionList } from '../../components/index'
import { TransactionStore } from '../../store/index'

export default class WalletDetailView extends React.Component {

    constructor (props) {
        super(props)
        const wallet = this.props.navigation.getParam('wallet', {})
        this.store = new TransactionStore(wallet.symbol, wallet.address)
    }

    componentDidMount() {
        this.store.loadTransactions()
            .catch(e => alert(e))
    }

    render () {
        const wallet = this.props.navigation.getParam('wallet', {})
        return (
            <View style={styles.container}>
                <WalletSummaryCard symbol={wallet.symbol} accountAddress={wallet.address} linkedAddress={wallet.linkedAddress} balance={wallet.balance}/>
                <TransactionList fetchTransaction={() => {}} data={this.store.transactions}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingVertical: 0,
    },
})
