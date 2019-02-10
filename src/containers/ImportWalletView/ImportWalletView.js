import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {SegmentedControl, Input} from '../../components'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import withTitle from '../../components/HOC/withTitle'
import NavigationButton from "../../components/NavigationButton/NavigationButton";

const importMethods = [
    {
        type: 'mnemonic',
        form: [
            {key: 'mnemonic', label: 'Mnemonic', type: 'string'},
            {key: 'password', label: 'Password', type: 'password'}
        ]
    },
    {type: 'privateKey', form: [{key: 'privateKey', label: 'Private Key', type: 'string'}]}
]

const TitledSegmentedControl = withTitle(SegmentedControl)
const InputWithTitle = withTitle(Input)

@inject(['wallet'])
@observer
export default class ImportWalletView extends React.Component {
    @observable selectedMethodIndex = 0
    @observable value = {}
    @observable walletName = ''

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <InputWithTitle title={'지갑 이름'}
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
                    <NavigationButton title={'불러오기'} onPress={this.importWallet}/>
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
        const importType = importMethods[this.selectedMethodIndex].type
        if (this.walletName.length === 0) {
            alert('지갑 이름을 입력해주세요')
        } else if (this.value.length === 0) {
            alert(`${importType}을 입력해주세요`)
        } else {
            const {coin} = this.props.navigation.state.params
            this.props.wallet.importWallet(coin, this.walletName, importType, this.value)
                .then(res => this.props.navigation.navigate('Main'))
                .catch(err => alert('지갑 연동에 실패했습니다'))
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