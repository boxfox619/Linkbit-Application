import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TextInput} from 'react-native'
import DropdownMenu from 'react-native-dropdown-menu'

export default class AmountInput extends React.Component {
    static propTypes = {
        symbols: PropTypes.array.isRequired,
        amount: PropTypes.any.isRequired,
        onChangeAmount: PropTypes.func.isRequired,
        onChangeSymbol: PropTypes.func.isRequired
    }


    constructor(props) {
        super(props)
    }

    render() {
        const {amount, symbols, onChangeAmount, onChangeSymbol} = this.props

        return (
            <View style={styles.amountContainer}>
                <TextInput
                    style={styles.unitInput}
                    keyboardType='numeric'
                    value={String(amount)}
                    onChangeText={text => onChangeAmount(text)}/>
                <View style={styles.unitPicker}>
                    <DropdownMenu
                        bgColor="transparent"
                        tintColor="#594343"
                        activityTintColor="#594343"
                        optionTextStyle={{color: '#594343', backgroundColor: '#ffffff', zIndex: 2}}
                        titleStyle={{color: '#594343'}}
                        handler={(selection, row) => onChangeSymbol(symbols[selection][row])}
                        data={symbols}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    amountContainer: {
        display: 'flex',
        flexDirection: 'row',
        zIndex: 2,
    },
    unitInput: {
        height: 53,
        flexGrow: 1,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#594343',
        paddingHorizontal: 6,
    },
    unitPicker: {
        height: 53,
        width: 100,
        marginLeft: 6,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#594343',
    },
})
