import React from 'react'
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import AddressInput from './AddressInput/AddressInput'
import AmountInput from './AmountInput/AmountInput'
import RemittanceType from '../../store/RemittanceType'
import WalletSummaryCard from "../../components/Card/WalletSummaryCard"
import { inject, observer } from "mobx-react/index"
import { observable } from 'mobx'
import { PRIMARY_COLOR } from "../../libs/Constraints"
import CommonStyle from '../../libs/CommonStyle'
import WithdrawStore from '../../store/Withdraw/WithdrawStore'
import Input from '../../components/Input/Input'
import Loading from '../../components/Loading/Loading'
import { WalletStore } from '../../store';
import i18n from '../../libs/Locale'

@inject(['setting'])
@observer
export default class RemittanceView extends React.Component {
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
    @observable label = 'PIN 번호를 입력해주세요'
    @observable isLoading = false

    constructor(props) {
        super(props)
        this.withdrawStore = new WithdrawStore()
        this.withdrawStore.setSourceWallet(this.wallet.symbol, this.wallet.address)
        this.withdrawStore.setMoneySymbol(props.setting.currency)
        this.calculateSymbol = this.wallet.symbol
    }

    render() {
        const { method, calculateSymbol, step } = this
        const { destAddress, amount, price, symbol, password, moneySymbol } = this.withdrawStore
        const wallet = this.wallet
        return (
            <React.Fragment>
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
                    <View style={styles.container}>
                        <View style={styles.wrapper}>
                            <View style={styles.label}>
                                <Text style={styles.title}>출금 지갑</Text>
                            </View>
                            <WalletSummaryCard wallet={wallet} />
                            {method === RemittanceType.Wallet && (
                                <React.Fragment>
                                    <View style={styles.label}>
                                        <Text style={styles.title}>받는 주소</Text>
                                        <Text style={styles.error}>{this.withdrawStore.destAddressError}</Text>
                                    </View>
                                    <AddressInput
                                        address={destAddress}
                                        edit={step < 2}
                                        onChangeText={this.withdrawStore.setTargetAddress}
                                        onPress={() => {
                                            this.step = 1
                                        }} />
                                </React.Fragment>
                            )
                            }
                            {
                                step >= 2 && (
                                    <>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>보낼 금액</Text>
                                        </View>
                                        <AmountInput
                                            symbol={wallet.symbol}
                                            moneySymbol={moneySymbol}
                                            price={price || ''}
                                            amount={amount || ''}
                                            selectedSymbol={calculateSymbol}
                                            onChangeAmount={this.handleChangeAmount}
                                            onChangeSymbol={(item) => this.calculateSymbol = item}
                                            edit={step === 2}
                                            onPress={() => {
                                                this.step = 2
                                            }} />
                                    </>
                                )
                            }
                            {
                                step >= 3 && this.withdrawStore.passwordRequired && (
                                    <>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>지갑 비밀번호</Text>
                                        </View>
                                        <View style={styles.addressContainer}>
                                            <Input
                                                secureTextEntry={true}
                                                defaultValue={password}
                                                onChangeText={this.withdrawStore.setPassword}
                                                placeholder="Type wallet password" />
                                        </View>
                                    </>
                                )
                            }
                        </View>
                        <NavigationButton title={this.buttonLabel} onPress={this.nextStep} />
                    </View>
                </SafeAreaView>
                <Loading isLoading={this.isLoading} />
            </React.Fragment>
        )
    }

    nextStep = () => {
        if (this.method === RemittanceType.Wallet) {
            switch (this.step) {
                case 1:
                    if (this.withdrawStore.destAddressError) {
                        alert(this.withdrawStore.destAddressError)
                        break;
                    }
                    this.step += 1
                    break
                case 2:
                    if (this.withdrawStore.amountError) {
                        alert(this.withdrawStore.amountError)
                        break;
                    }
                    this.step += 1
                    break
                case 3:
                    this.onSubmit()
            }
        }
    }

    get buttonLabel() {
        return this.step >= 3 ? '송금하기' : '다음'
    }

    onSubmit = () => {
        this.isLoading = true
        this.withdrawStore.withdraw()
            .then(res => {
                this.isLoading = false
                this.props.navigation.navigate({
                    routeName: 'Invoice',
                    params: {
                        symbol: this.withdrawStore.symbol,
                        amount: this.withdrawStore.amount,
                        destAddress: this.withdrawStore.name,
                        withDrawWalletName: this.wallet,
                        // TODO: 잔액을 불러와야 함
                        balance: 3.1415926535,
                    },
                })
            })
            .catch(err => {
                this.isLoading = false
                alert(err)
            })
    }

    handleChangeAmount = (amount) => {
        const { symbol } = this.withdrawStore
        if (this.calculateSymbol === symbol) {
            this.withdrawStore.setAmount(amount)
        } else {
            this.withdrawStore.setPrice(amount)
        }
    }

    get wallet() {
        return this.props.navigation.getParam("wallet")
    }

    onCommissionChanged = (value) => {
        this.commission = value
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
    label: {
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 'auto',
        position: 'relative'
    },
    title: {
        color: '#594343',
        fontSize: 14,
        fontWeight: 'bold',
    },
    error: {
        position: 'absolute',
        color: 'red',
        right: 0,
        top: 0,
        marginHorizontal: 'auto',
    },
    password: {
        flexGrow: 1,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#594343',
        paddingHorizontal: 6,
    },
    addressContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
})
