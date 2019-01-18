import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import AddressBox from './AddressBox/AddressBox'
import AddressInput from './AddressInput/AddressInput'
import AmountInput from './AmountInput/AmountInput'
import AmountBox from './AmountBox/AmountBox'
import RemittanceType from '../../store/RemittanceType'
import WalletSummaryCard from "../../components/Card/WalletSummaryCard"
import CommissionInput from "./CommissionInput/CommisionInput"
import { inject, observer } from "mobx-react/index"
import { observable } from 'mobx'
import WithdrawStore from '../../store/Withdraw/WithdrawStore'

@inject(['coin'])
@observer
export default class RemmittanceView extends React.Component {
    @observable step = 1
    @observable method = RemittanceType.Wallet
    @observable calculateSymbol = 'USD'
    @observable commission = 0
    @observable ratio = 0.1582

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
                    this.withdrawStore.withdraw('1234')
                    break;
            }
        }
    }

    render() {
        const { method, calculateSymbol, step, commission, ratio } = this
        const { destAddress, amount, price, symbol, moneySymbol } = this.withdrawStore
        const wallet = this.wallet
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>출금 지갑</Text>
                    <WalletSummaryCard wallet={wallet} />
                    {step < 2 && method === RemittanceType.Wallet && (
                        <React.Fragment>
                            <Text style={styles.title}>받는 주소</Text>
                            <AddressInput
                                address={destAddress}
                                onChangeText={destAddress => this.withdrawStore.setTargetAddress(destAddress)} />
                        </React.Fragment>
                    )
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
                        step === 4 &&
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
            </View>
        )
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
