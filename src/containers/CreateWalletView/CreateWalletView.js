import React from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import Input from '../../components/Input/Input'
import withTitle from '../../components/HOC/withTitle'
import Loading from '../../components/Loading/Loading'
import { inject, observer } from 'mobx-react'
import CoinItem from '../../components/Card/CoinItem'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CommonStyle from '../../libs/CommonStyle'
import i18n from '../../libs/Locale'

const InputWithTitle = withTitle(Input)

@inject(['wallet'])
@observer
export default class CreateWalletView extends React.Component {
    state = {
        progress: false,
        selectedIndex: 0,
        coin: {},
        walletName: '',
        inValidWalletName: false,
        password: '',
        invalidPassword: false,
        confirmPassword: '',
        invalidConfirmPassword: false,
        isLoading: false,
    }

    componentWillMount() {
        const coin = this.props.navigation.getParam('coin', {})
        this.setState({ coin })
    }

    render() {
        const {
            coin,
            walletName,
            invalidWalletName,
            password,
            confirmPassword,
            invalidPassword,
            invalidConfirmPassword,
            isLoading,
        } = this.state

        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
                    <View style={styles.container}>
                        <ScrollView style={styles.scrollContainer}>
                            <View style={styles.formContainer}>
                                <CoinItem name={coin.name}
                                    symbol={coin.symbol}
                                    themeColor={coin.themeColor}
                                    onPress={() => { }}
                                    activate={true} />
                                <InputWithTitle title={i18n.t('wallet_name')}
                                    value={walletName}
                                    onChangeText={text => this.setState({ walletName: text })}
                                    isError={invalidWalletName} />
                                {/* <InputWithTitle title={'지갑 설명'} /> */}
                                <InputWithTitle title={i18n.t('pin')}
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={text => this.setState({ password: text })}
                                    isError={invalidPassword} />
                                <InputWithTitle title={i18n.t('verify_pin')}
                                    secureTextEntry={true}
                                    value={confirmPassword}
                                    onChangeText={this.checkConfirmPassword}
                                    isError={invalidConfirmPassword} />
                                {/* <SegmentedControlWithTitle title={'공개범위 설정'}
                                options={['소유자 정보', '지갑 정보']}
                                selectedIndex={selectedIndex}
                                onChange={index => this.setState({ selectedIndex: index })} /> */}
                            </View>
                        </ScrollView>
                        <NavigationButton title={i18n.t('add')} onPress={this.createWallet} />
                    </View>
                </SafeAreaView>
                <Loading isLoading={isLoading} />
            </React.Fragment>
        )
    }

    checkConfirmPassword = text => {
        const { password, confirmPassword } = this.state

        this.setState({ confirmPassword: text })

        if (password === confirmPassword) {
            this.setState({ invalidConfirmPassword: false })
        }
        else {
            this.setState({ invalidConfirmPassword: false })
        }
    }

    createWallet = async () => {
        this.setState({ progress: true })
        const { coin, walletName, password, confirmPassword } = this.state

        if (!walletName) {
            this.setState({ invalidWalletName: true })
            alert(i18n.t('enter_name'))
            return
        }
        else {
            this.setState({ invalidWalletName: false })
        }

        if (!password) {
            this.setState({ invalidPassword: true })
            alert(i18n.t('enter_pin'))
            return
        }
        else {
            this.setState({ invalidPassword: false })
        }

        if (password !== confirmPassword) {
            this.setState({ invalidConfirmPassword: true })
            alert(i18n.t('wrong_pin'))
            return
        }
        else {
            this.setState({ invalidConfirmPassword: false })
        }

        await this.setState({ isLoading: true })
        await this.props.wallet.createWallet(coin.symbol, walletName, password).then(() => {
            this.setState({ progress: false })
            this.props.navigation.navigate('Main')
        }).catch(e => {
            this.setState({ progress: false })
            alert(i18n.t('fail_add_wallet'))
        })
        await this.setState({ isLoading: false })
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    scrollContainer: {
        height: '100%',
        marginBottom: 56,
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 5,
    },
    icon: {
        width: 40,
        height: 40,
    }
})
