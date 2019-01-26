import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { WalletSummaryCard, TransactionList } from '../../components/index'
import { TransactionStore } from '../../store/index'
import { observer } from 'mobx-react'
import { PRIMARY_COLOR } from "../../libs/Constraints"
import CommonStyle from '../../libs/CommonStyle'
import ActionButton from "react-native-action-button"
import { Icon } from 'react-native-elements'

@observer
export default class WalletDetailView extends React.Component {

    constructor(props) {
        super(props)
        const wallet = this.props.navigation.getParam('wallet', {})
        this.store = new TransactionStore(wallet.symbol, wallet.address)
    }

    componentDidMount() {
        this.store.loadTransactions()
            .catch(e => alert(e))
    }

    render() {
        const wallet = this.props.navigation.getParam('wallet', {})
        return (
            <SafeAreaView style={CommonStyle.safeArea}>
                <View style={styles.container}>
                    <WalletSummaryCard wallet={wallet} />
                    <TransactionList style={{ padding: 10 }} refreshing={this.store.loading} data={this.store.transactions} />
                    <ActionButton buttonColor={PRIMARY_COLOR}
                        onPress={() => this.props.navigation.navigate("Withdraw", { wallet })}
                        offsetX={20}
                        offsetY={20}
                        renderIcon={() => <Icon name="account-balance-wallet" color="#fff" />}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
})
