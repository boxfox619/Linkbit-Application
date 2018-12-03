import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import DropdownMenu from 'react-native-dropdown-menu'

export default class AmountInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: props.value
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ amount: props.value })
    }

    render() {
        const { amount } = this.state
        const { data, onChangeText, onOptionChange } = this.props

        return (
            <View style={styles.amountContainer}>
                <TextInput style={styles.unitInput}
                    value={amount}
                    onChangeText={text => onChangeText(text)} />
                <View style={styles.unitPicker}>
                    <DropdownMenu
                        bgColor={'transparent'}
                        tintColor={'#594343'}
                        activityTintColor={'#594343'}
                        // arrowImg={}      
                        // checkImage={}   
                        optionTextStyle={{ color: '#594343', backgroundColor: '#ffffff', zIndex: 2 }}
                        titleStyle={{ color: '#594343' }}
                        // maxHeight={300} 
                        handler={onOptionChange}
                        data={data} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    amountContainer: {
        display: 'flex',
        flexDirection: 'row',
        zIndex: 2
    },
    unitInput: {
        height: 53,
        flexGrow: 1,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#594343',
        paddingHorizontal: 6
    },
    unitPicker: {
        height: 53,
        width: 100,
        marginLeft: 6,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#594343'
    }
})