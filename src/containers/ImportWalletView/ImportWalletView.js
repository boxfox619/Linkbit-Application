import React from 'react'
import {View, StyleSheet} from 'react-native'
import {SegmentedControl, Input} from '../../components'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import withTitle from '../../components/HOC/withTitle'

const importMethods = ['Memonic', 'Private Key']

const TitledSegmentedControl = withTitle(SegmentedControl)
const InputWithTitle = withTitle(Input)

@observer
export default class ImportWalletView extends React.Component {
    @observable selectedMethodIndex = 0
    @observable value = ''

    render() {
        render(
            <View>
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
        )
    }

    handleMethodChange = (idx) => {
        this.selectedMethodIndex = idx
        this.value = ''
    }

    handleChangeText = (text) => {
        this.value = text
    }
}


    const
    styles = StyleSheet.create({})