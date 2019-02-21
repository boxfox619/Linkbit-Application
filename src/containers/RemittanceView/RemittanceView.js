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
import Dialog from 'react-native-dialog'
import Input from "../../components/Input/Input";

@inject(['setting'])
@observer
export default class RemittanceView extends React.Component {
    @observable step = 1
    @observable modalVisibility = false
    @observable userPasswordInput = ''
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
        this.withdrawStore.setMoneySymbol('USD')
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
                                            price={price == 0 ? '' : price}
                                            amount={amount == 0 ? '' : amount}
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
                                step >= 3 && (
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
                            {/*                        {
                            step >= 3 &&
                            <React.Fragment>
                                <View style={styles.label}>
                                    <Text style={styles.title}>수수료</Text>
                                    <Text style={[styles.title, {fontSize: 14}]}>
                                        {`${symbol} ${this.commission * this.ratio}`}
                                    </Text>
                                </View>
                                <CommissionInput commission={this.commission} onValueChange={this.onCommissionChanged}/>
                            </React.Fragment>
                        }*/}
                        </View>
                        <NavigationButton
                            title={step === 3 ? '송금하기' : '다음'}
                            onPress={this.nextStep} />
                        <Dialog.Container visible={this.modalVisibility}>
                            <Dialog.Title>Verify wallet password</Dialog.Title>
                            <Dialog.Input value={this.userPasswordInput}
                                onChangeText={text => this.userPasswordInput = text}
                                secureTextEntry={true} />
                            <Dialog.Button label="Cancel"
                                onPress={this.onCancel} />
                            <Dialog.Button label="Submit"
                                onPress={this.onSubmit} />
                        </Dialog.Container>
                    </View>
                </SafeAreaView>
                {
                    this.isLoading &&
                    <View style={styles.indicatorBackground}>
                        <ActivityIndicator style={styles.indicator}
                            size="large"
                            color="#cccccc"/>
                    </View>
                }
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
                    this.isLoading = true
                    this.withdrawStore.withdraw()
                        .then(res => alert('송금 성공'))
                        .catch(err => alert('송금 실패'))
                    this.isLoading = false
                    break
            }

            if (this.step > 4) {
                this.modalVisibility = true
            }
        }
    }

    onCancel = () => {
        this.modalVisibility = false
    }

    onSubmit = () => {
        // check
        if (this.userPasswordInput === 'wallet password') {
            this.props.navigation.navigate('Main')
            this.modalVisibility = false
        }
        else {
            alert('Password is incorrect')
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

    get wallet() {
        return this.props.navigation.getParam("wallet")
    }

    onCommissionChanged = (value) => {
        this.commission = value
    }

    onPinVerify = (pin) => {
        if (this.props.setting.pin === pin) {
            this.view = 'menu'
            this.withdrawStore.withdraw(pin)
        } else {
            this.label = 'PIN 번호가 일치하지 않습니다'
        }

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
    indicatorBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
    },
    indicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})
