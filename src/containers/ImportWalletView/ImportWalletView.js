import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {SegmentedControl, InputWithTitle} from '../../components'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import withTitle from '../../components/HOC/withTitle'
import NavigationButton from "../../components/Button/NavigationButton";
import { handleError } from '../../libs/ErrorHandler';
import i18n from '../../libs/Locale'

const importMethods = [
    {
        type: 'mnemonic',
        form: [
            {key: 'mnemonic', label: 'Mnemonic', type: 'string'},
            {key: 'password', label: 'Password', type: 'password'}
        ]
    },
    {type: 'privateKey', form: [{key: 'privateKey', label: 'PrivateKey', type: 'string'}]}
]

const TitledSegmentedControl = withTitle(SegmentedControl)

@inject(['wallet'])
@observer
export default class ImportWalletView extends React.Component {
    static navigationOptions = () => {
        return {
            title: 'Import wallet',
            headerTitleStyle: { color: 'black' },
            headerStyle: { backgroundColor: 'white' },
        }
    }

    @observable selectedMethodIndex = 0
    @observable value = {}
    @observable walletName = ''

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <InputWithTitle title={i18n.t('wallet_name')}
                                        value={this.walletName}
                                        onChangeText={text => this.walletName = text}/>
                        <TitledSegmentedControl
                            title={'Import type'}
                            options={importMethods.map(m => m.type)}
                            selectedIndex={this.selectedMethodIndex}
                            onChange={this.handleMethodChange}/>
                        {importMethods[this.selectedMethodIndex].form.map(input => (
                            <InputWithTitle
                                key={input.key}
                                secureTextEntry={input.type === 'password'}
                                value={this.value[input.key]}
                                title={input.label}
                                onChangeText={this.handleChangeText(input.key)}/>
                        ))}
                    </View>
                    <NavigationButton title={i18n.t('import')} onPress={this.importWallet}/>
                </View>
            </SafeAreaView>
        )
    }

    handleMethodChange = (idx) => {
        this.selectedMethodIndex = idx
        this.value = {}
    }

    handleChangeText = (key) => (text) => {
        this.value[key] = text
    }

    importWallet = () => {
        const importMethod = importMethods[this.selectedMethodIndex]
        const importType = importMethod.type
        const invalidInput = importMethod.form.find(input => !this.value[input.key] || this.value[input.key].length === 0)
        if (this.walletName.length === 0) {
            alert(i18n.t('enter_wallet_name'))
        }else if (invalidInput) {
            alert(`${i18n.t('enter_missing_field')} : ${invalidInput.label}`)
        } else {
            const {coin} = this.props.navigation.state.params
            this.props.wallet.importWallet(coin.symbol, this.walletName, importType, this.value)
                .then(res => this.props.navigation.navigate('Main'))
                .catch(err => {
                    handleError(err)
                    alert(err.message || i18n.t('import_wallet_failed'))
                })
        }
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    formContainer: {
        paddingHorizontal: 20
    }
})