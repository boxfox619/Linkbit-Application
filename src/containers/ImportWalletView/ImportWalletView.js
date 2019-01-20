import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {SegmentedControl, Input} from '../../components'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import withTitle from '../../components/HOC/withTitle'
import NavigationButton from "../../components/NavigationButton/NavigationButton";

const importMethods = ['Mnemonic', 'Private Key']

const TitledSegmentedControl = withTitle(SegmentedControl)
const InputWithTitle = withTitle(Input)

@inject(['wallet'])
@observer
export default class ImportWalletView extends React.Component {
    @observable selectedMethodIndex = 0
    @observable value = ''
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
                            options={importMethods}
                            selectedIndex={this.selectedMethodIndex}
                            onChange={this.handleMethodChange}/>
                        <InputWithTitle
                            value={this.value}
                            title={importMethods[this.selectedMethodIndex]}
                            onChangeText={this.handleChangeText}/>
                    </View>
                    <NavigationButton title={'불러오기'} onPress={this.importWallet}/>
                </View>
            </SafeAreaView>
        )
    }

    handleMethodChange = (idx) => {
        this.selectedMethodIndex = idx
        this.value = ''
    }

    handleChangeText = (text) => {
        this.value = text
    }

    importWallet = () => {
        const {coin} = this.props.navigation.state.params
        const importType = importMethods[this.selectedMethodIndex]
        this.props.wallet.importWallet(coin, this.walletName, {type: importType, data: this.value})
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