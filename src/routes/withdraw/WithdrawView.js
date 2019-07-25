import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native'
import i18n from '../../libs/Locale'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import Title from '../../components/Label/Title'
import CommonStyle from '../../libs/CommonStyle'
import WithdrawStore from '../../store/WithdrawStore'
import { AmountInput, AddressInput, InputWithTitle } from '../../components/Input'
import RemittanceType from '../../store/RemittanceType'
import { WalletSummaryCard } from '../../components/Card'
import { NavigationButton } from '../../components/Button'
import { withProgressDialog, withVerify } from '../../components/HOC'
import { handleError } from '../../libs/ErrorHandler'

@inject('setting', 'wallet', 'coin')
@observer
class WithdrawView extends React.Component {
  static navigationOptions = () => {
    return {
      title: i18n.t('withdraw'),
      headerTitleStyle: { color: 'black' },
      headerStyle: { backgroundColor: 'white' },
    }
  }

  @observable step = 1
  @observable method = RemittanceType.Wallet
  @observable calculateSymbol = 'USD'
  @observable commission = 0
  @observable ratio = 0.1582
  @observable label = i18n.t('enter_pin')

  constructor(props) {
    super(props)
    const transactionStore = props.navigation.getParam('transactionStore')
    this.withdrawStore = new WithdrawStore(props.coin, props.wallet, transactionStore)
    this.withdrawStore.setSourceWallet(this.wallet.symbol, this.wallet.address)
    this.withdrawStore.setMoneySymbol(props.setting.currency)
    this.calculateSymbol = this.wallet.symbol
  }

  get buttonLabel() {
    return this.step >= 3 ? i18n.t('withdraw') : i18n.t('next')
  }

  get wallet() {
    const wallet = this.props.navigation.getParam('wallet')

    return this.props.wallet.getWallet(wallet.address)
  }

  nextStep = () => {
    if (this.method === RemittanceType.Wallet) {
      switch (this.step) {
      case 1:
        this.withdrawStore.checkAddressValid().then(() => {
          if (this.withdrawStore.destAddressError) {
            Alert.alert(this.withdrawStore.destAddressError)
          } else {
            this.step += 1
          }
        })
        break
      case 2:
        if (this.withdrawStore.amountError) {
          Alert.alert(this.withdrawStore.amountError)
          break
        }
        this.step += 1
        break
      case 3:
        if (!this.withdrawStore.passwordRequired) {
          this.step += 1
        }
        break
      default:
        this.props.requestVerify((res) => {
          if (res) {
            this.onSubmit()
          }
        })
      }
    }
  }

  onSubmit = async () => {
    this.props.showProgress(true)
    try {
      await this.withdrawStore.withdraw()
      this.props.showProgress(false, '', () => {
        this.props.navigation.navigate({
          routeName: 'Invoice',
          params: {
            symbol: this.withdrawStore.symbol,
            amount: this.withdrawStore.amount,
            destAddress: this.withdrawStore.destAddress,
            withDrawWalletName: this.wallet.name,
            balance: this.wallet.balance,
          },
        })
      })
    } catch (err) {
      handleError(err)
      this.props.showProgress(false, '', () => Alert.alert(err.message))
    } finally {
      this.props.showProgress(false)
    }
  }

  handleChangeAmount = (amount) => {
    const { symbol } = this.withdrawStore
    if (this.calculateSymbol === symbol) {
      this.withdrawStore.setAmount(amount)
    } else {
      this.withdrawStore.setPrice(amount)
    }
  }

  onCommissionChanged = (value) => {
    this.commission = value
  }

  render() {
    const { method, calculateSymbol, step } = this
    const { destAddress, amount, price, password, moneySymbol } = this.withdrawStore
    const wallet = this.wallet

    return (
      <React.Fragment>
        <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <Title title={i18n.t('withdraw_source_wallet')} />
              <WalletSummaryCard wallet={wallet} />
              {method === RemittanceType.Wallet && (
                <AddressInput
                  title={i18n.t('target_address')}
                  address={destAddress}
                  edit={step < 2}
                  error={this.withdrawStore.destAddressError}
                  onChangeText={this.withdrawStore.setTargetAddress}
                  onPress={() => this.step = 1} />
              )}
              {step >= 2 && (
                <AmountInput
                  title={i18n.t('withdraw_amount')}
                  symbol={wallet.symbol}
                  moneySymbol={moneySymbol}
                  price={price || ''}
                  amount={amount || ''}
                  selectedSymbol={calculateSymbol}
                  onChangeAmount={this.handleChangeAmount}
                  onChangeSymbol={(item) => this.calculateSymbol = item}
                  edit={step === 2}
                  onPress={() => this.step = 2} />
              )}
              {step >= 3 && this.withdrawStore.passwordRequired && (
                <InputWithTitle
                  title={i18n.t('password')}
                  secureTextEntry
                  defaultValue={password}
                  onChangeText={this.withdrawStore.setPassword}
                  error={this.withdrawStore.passwordRequired ? i18n.t('msg_valid_password') : undefined}
                  placeholder="Type wallet password" />
              )}
            </View>
            <NavigationButton title={this.buttonLabel} onPress={this.nextStep} />
          </View>
        </SafeAreaView>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  password: {
    flexGrow: 1,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#594343',
    paddingHorizontal: 6,
  },
})
export default withVerify(withProgressDialog(WithdrawView))