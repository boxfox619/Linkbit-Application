import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {SegmentedControl, Input} from '../../components'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import withTitle from '../../components/HOC/withTitle'
import NavigationButton from "../../components/NavigationButton/NavigationButton";

const importMethods = ['Memonic', 'Private Key']

const TitledSegmentedControl = withTitle(SegmentedControl)
const InputWithTitle = withTitle(Input)

@observer
export default class ImportWalletView extends React.Component {
    @observable selectedMethodIndex = 0
    @observable value = ''

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <TitledSegmentedControl
                            title={'Import type'}
                            options={importMethods}
                            selectedIndex={this.selectedMethodIndex}
                            onChange={this.handleMethodChange}/>
                        <InputWithTitle
                            value={this.value}
                            title={importMethods[this.selectedMethodIndex]}
                            onChangeText={this.handleChangeText}
                            maxLength = {40}/>
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