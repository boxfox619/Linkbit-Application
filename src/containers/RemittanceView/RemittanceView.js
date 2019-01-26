import React from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import AddressBox from './AddressBox/AddressBox'
import AddressInput from './AddressInput/AddressInput'
import AmountInput from './AmountInput/AmountInput'
import AmountBox from './AmountBox/AmountBox'
import RemittanceType from '../../store/RemittanceType'
import WalletSummaryCard from "../../components/Card/WalletSummaryCard"
import { inject, observer } from "mobx-react/index"
import { observable } from 'mobx'
import WithdrawStore from '../../store/Withdraw/WithdrawStore'
import { PRIMARY_COLOR } from "../../libs/Constraints"
import CommonStyle from '../../libs/CommonStyle'

@inject(['coin'])
@observer
export default class RemmittanceView extends React.Component {
    @observable step = 1
    @observable method = RemittanceType.Wallet
    @observable calculateSymbol = 'USD'

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
                    this.withdrawStore.withdraw('1234')
                    break;
            }
        }
    }

    render() {
        const { method, calculateSymbol, step } = this
        const { destAddress, amount, price, symbol, moneySymbol } = this.withdrawStore
        const wallet = this.wallet
        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
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
                                step === 3 &&
                                <AmountBox price={price}
                                    moneySymbol={moneySymbol}
                                    symbol={symbol}
                                    amount={amount} />
                            }
                        </View>
                        <NavigationButton
                            title={step === 3 ? '송금하기' : '다음'}
                            onPress={this.nextStep} />
                    </View>
                </SafeAreaView>
            </React.Fragment>
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
        width: '100%',
        marginHorizontal: 'auto',
        marginTop: 20,
        marginBottom: 5,
    },
})
