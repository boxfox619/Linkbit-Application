import React from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { NavigationButton } from '../../components/Button'
import { InputWithTitle } from '../../components/Input/Input'
import { inject, observer } from 'mobx-react'
import CoinItem from '../../components/Card/CoinItem'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CommonStyle from '../../libs/CommonStyle'
import i18n from '../../libs/Locale'
import { debounce } from 'lodash'
import { withProgressDialog } from '../../components/HOC'

@inject(['wallet'])
@observer
class CreateWalletView extends React.Component {
    state = {
        selectedIndex: 0,
        coin: {},
        walletName: '',
        inValidWalletName: false,
        password: '',
        invalidPassword: false,
        confirmPassword: '',
        invalidConfirmPassword: false,
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
        } = this.state
        const createWallet = debounce(this.createWallet, 800)

        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
                    <View style={styles.container}>
                        <ScrollView style={styles.scrollContainer}>
                            <View style={styles.formContainer}>
                                <CoinItem coin={coin} activate={true} />
                                <InputWithTitle title={i18n.t('wallet_name')}
                                    value={walletName}
                                    onChangeText={text => this.setState({ walletName: text })}
                                    error={invalidWalletName} />
                                {/* <InputWithTitle title={'지갑 설명'} /> */}
                                <InputWithTitle title={i18n.t('pin')}
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={text => this.setState({ password: text })}
                                    error={invalidPassword} />
                                <InputWithTitle title={i18n.t('verify_pin')}
                                    secureTextEntry={true}
                                    value={confirmPassword}
                                    onChangeText={this.checkConfirmPassword}
                                    error={invalidConfirmPassword} />
                                {/* <SegmentedControlWithTitle title={'공개범위 설정'}
                                options={['소유자 정보', '지갑 정보']}
                                selectedIndex={selectedIndex}
                                onChange={index => this.setState({ selectedIndex: index })} /> */}
                            </View>
                        </ScrollView>
                        <NavigationButton title={i18n.t('add')} onPress={createWallet} />
                    </View>
                </SafeAreaView>
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
        this.props.showProgress(true, '', async () => {
            const { coin, walletName, password, confirmPassword } = this.state
            if (!walletName) {
                this.setState({ invalidWalletName: i18n.t('enter_name') })
                return
            } else {
                this.setState({ invalidWalletName: undefined })
            }

            if (!password) {
                this.setState({ invalidPassword: i18n.t('enter_pin') })
                return
            }
            else {
                this.setState({ invalidPassword: undefined })
            }

            if (password !== confirmPassword) {
                this.setState({ invalidConfirmPassword: i18n.t('wrong_pin') })
                return
            } else {
                this.setState({ invalidConfirmPassword: undefined })
            }
            try {
                await this.props.wallet.createNewWallet(coin.symbol, walletName, password)
                this.props.showProgress(false, '', () => this.props.navigation.navigate('Main'))
            } catch (err) {
                this.props.showProgress(false, '', () => alert(i18n.t('fail_add_wallet')))
            }
        })
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
export default withProgressDialog(CreateWalletView)