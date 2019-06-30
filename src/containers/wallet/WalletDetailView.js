import React from 'react'
import { View, StyleSheet, SafeAreaView, Clipboard } from 'react-native'
import ActionButton from 'react-native-action-button'
import { observer } from 'mobx-react'
import { Icon } from 'react-native-elements'
import { WalletSummaryCard, TransactionList } from '../../components/index'
import { TransactionStore } from '../../store/index'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CommonStyle from '../../libs/CommonStyle'
import i18n from '../../libs/Locale'
import { handleError } from '../../libs/ErrorHandler'

@observer
export default class WalletDetailView extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const { params = { wallet } } = navigation.state

      return {
        title: i18n.t('detail'),
        headerTitleStyle: { color: 'black' },
        headerStyle: { backgroundColor: 'white' },
        headerRight: <Icon
          name="share"
          style={{ color: '#fff' }}
          containerStyle={{ marginRight: 10 }}
          onPress={() => {
            const address = params.wallet.address
            Clipboard.setString(address)
            alert(i18n.t('copied_addr'))
          }} />,
      }
    }

    constructor(props) {
      super(props)
      const wallet = this.props.navigation.getParam('wallet', {})
      this.store = new TransactionStore(wallet.symbol, wallet.address)
    }

    componentDidMount() {
      this.store.loadTransactions().then(() => {
        this.store.refreshTransactions().catch(e => {
          handleError(e)
          alert(e.message)
        })
      }).catch(e => {
        handleError(e)
        alert(e.message)
      })
    }

    handleRefreshTransactions = () => {
      this.store.refreshTransactions().catch(e => {
        handleError(e)
        alert(e.message)
      })
    }

    handleLongSelectTransaction = (txHash) => {
      const transaction = this.store.transactionList.find(tr => tr.hash === txHash)
      if (transaction.benefit) {
        Clipboard.setString(transaction.sourceAddress)
      } else {
        Clipboard.setString(transaction.targetAddress)
      }
      alert(i18n.t('copied_target_address'))
    }

    handleSelectTransaction = (txHash) => {
      this.props.navigation.navigate('TransactionDetail', { txHash })
    }

    render() {
      const wallet = this.props.navigation.getParam('wallet', {})
      
      return (
        <SafeAreaView style={CommonStyle.safeArea}>
          <View style={styles.container}>
            <WalletSummaryCard wallet={wallet} />
            <TransactionList
              style={{ padding: 10 }}
              refreshing={this.store.loading}
              data={this.store.transactionList}
              symbol={wallet.symbol}
              onSelect={this.handleSelectTransaction}
              onLongSelect={this.handleLongSelectTransaction}
              fetchTransaction={this.handleRefreshTransactions} />
            <ActionButton
              buttonColor={PRIMARY_COLOR}
              onPress={() => this.props.navigation.navigate('Withdraw', { wallet, transactionStore: this.store })}
              offsetX={20}
              offsetY={20}
              renderIcon={() => <Icon name="account-balance-wallet" color="#fff" />} />
          </View>
        </SafeAreaView>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})
