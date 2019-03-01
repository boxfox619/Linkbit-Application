import React from 'react'
import { from  } from 'rxjs'
import { observer } from 'mobx-react'
import { View, StyleSheet, SafeAreaView, Clipboard } from 'react-native'
import ActionButton from "react-native-action-button"
import { Icon } from 'react-native-elements'
import { WalletSummaryCard, TransactionList } from '../../components/index'
import { TransactionStore } from '../../store/index'
import { PRIMARY_COLOR } from "../../libs/Constraints"
import CommonStyle from '../../libs/CommonStyle'
import i18n from '../../libs/Locale'

@observer
export default class WalletDetailView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = { wallet } } = navigation.state

        return {
            title: 'Details',
            headerTitleStyle: { color: 'black' },
            headerStyle: { backgroundColor: 'white' },
            headerRight: <Icon name={'share'}
                style={{ color: '#fff' }}
                containerStyle={{ marginRight: 10 }}
                onPress={() => {
                    const address = params.wallet.address
                    Clipboard.setString(address)
                    alert(i18n.t('copied_addr'))
                }} />
        }
    }

    constructor(props) {
        super(props)
        const wallet = this.props.navigation.getParam('wallet', {})
        this.store = new TransactionStore(wallet.symbol, wallet.address)
    }

    componentDidMount() {
        const errorMsg = '송금을 실패했습니다'
        this.store.loadTransactions().then(() => {
            if (this.store.transactions.length === 0) {
                this.store.fetchNewTransactions().catch(e => alert(errorMsg));
            }
        }).catch(e => alert(errorMsg))
    }

    render() {
        const wallet = this.props.navigation.getParam('wallet', {})
        return (
            <SafeAreaView style={CommonStyle.safeArea}>
                <View style={styles.container}>
                    <WalletSummaryCard wallet={wallet} />
                    <TransactionList style={{ padding: 10 }}
                                     refreshing={this.store.loading}
                                     data={this.store.transactionList}
                                     symbol={wallet.symbol}
                                     fetchTransaction={this.store.fetchNewTransactions}/>
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
