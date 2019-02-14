import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import AddressBox from './AddressBox/AddressBox'
import AddressInput from './AddressInput/AddressInput'
import AmountInput from './AmountInput/AmountInput'
import AmountBox from './AmountBox/AmountBox'
import RemittanceType from '../../store/RemittanceType'
import WalletSummaryCard from '../../components/Card/WalletSummaryCard'
import CommissionInput from "./CommissionInput/CommisionInput"
import { inject, observer } from "mobx-react/index"
import { observable } from 'mobx'
import WithdrawStore from '../../store/Withdraw/WithdrawStore'
import Dialog from 'react-native-dialog'

@inject(['coin'])
@inject(['setting'])
@observer
export default class RemmittanceView extends React.Component {
    @observable step = 1
    @observable modalVisibility = false
    @observable userPasswordInput = ''
    @observable method = RemittanceType.Wallet
    @observable calculateSymbol = 'USD'
    @observable commission = 0
    @observable ratio = 0.1582
    @observable label = 'PIN 번호를 입력해주세요'

    constructor(props) {
        super(props)
        this.withdrawStore = new WithdrawStore()
        this.withdrawStore.setSoruceWallet(this.wallet.symbol, this.wallet.address)
        this.withdrawStore.setMoneySymbol('USD')
        this.calculateSymbol = this.wallet.symbol
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
                    break;
                case 2:
                    if (this.withdrawStore.amountError) {
                        alert(this.withdrawStore.amountError)
                        break;
                    }
                    this.step += 1
                    break;
                case 3:
                    this.step += 1
                    break;
                case 4:
                    this.step += 1
                    break;
                case 5:
                    break;
            }

            if (this.step > 4) {
                this.modalVisibility = true
            }
        }
    }

    render() {
        const { method, calculateSymbol, step, commission, ratio } = this
        const { destAddress, amount, price, symbol, moneySymbol } = this.withdrawStore
        const wallet = this.wallet
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>출금 지갑</Text>
                        <WalletSummaryCard wallet={wallet} />
                        {
                            step < 2 && method === RemittanceType.Wallet &&
                            <React.Fragment>
                                <Text style={styles.title}>받는 주소</Text>
                                <AddressInput
                                    address={destAddress}
                                    onChangeText={destAddress => this.withdrawStore.setTargetAddress(destAddress)}
                                    onBlur={this.checkValidAddress}/>
                            </React.Fragment>
                        }
                        {
                            step >= 2 && method === RemittanceType.Wallet && (
                                <React.Fragment>
                                    <Text style={styles.title}>받는 주소</Text>
                                    <AddressBox address={destAddress} />
                                </React.Fragment>
                            )
                        }
                        {
                            step >= 2 &&
                            <Text style={styles.title}>보낼 금액</Text>
                        }
                        {
                            step === 2 &&
                            <AmountInput
                                symbols={[[wallet.symbol, moneySymbol]]}
                                amount={(calculateSymbol === symbol) ? amount : price}
                                onChangeAmount={this.handleChangeAmount}
                                onChangeSymbol={(item) => this.calculateSymbol = item} />
                        }
                        {
                            step >= 3 &&
                            <AmountBox price={price}
                                moneySymbol={moneySymbol}
                                symbol={symbol}
                                amount={amount} />
                        }
                        {
                            step >= 4 &&
                            <React.Fragment>
                                <View style={styles.commissionHeader}>
                                    <Text style={styles.title}>수수료</Text>
                                    <Text style={[styles.title, { fontSize: 18 }]}>{`${symbol} ${commission * ratio}`}</Text>
                                </View>
                                <CommissionInput commission={commission}
                                    onValueChange={this.onCommissionChanged} />
                            </React.Fragment>
                        }
                    </View>
                    <NavigationButton
                        title={step === 4 ? '송금하기' : '다음'}
                        onPress={this.nextStep} />
                    <Dialog.Container visible={this.modalVisibility}>
                        <Dialog.Title>Verify wallet password</Dialog.Title>
                        <Dialog.Input value={this.userPasswordInput}
                            onChangeText={text => this.userPasswordInput = text}
                            secureTextEntry={true}/>
                        <Dialog.Button label="Cancel"
                            onPress={this.onCancel} />
                        <Dialog.Button label="Submit"
                            onPress={this.onSubmit} />
                    </Dialog.Container>
                </View>
            </React.Fragment>
        )
    }

    onCancel = () => {
        this.modalVisibility = false
    }

    onSubmit = () => {
        // check 
        if (this.userPasswordInput === 'wallet password') {
            this.props.navigation.navigate('Main')
        }
        else {
            alert('Password is incorrect')
        }
        this.modalVisibility = false
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

    checkValidAddress = () => {
        //add checking address api
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
    title: {
        color: '#594343',
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 'auto',
        marginTop: 20,
        marginBottom: 5,
    },
    commissionHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
