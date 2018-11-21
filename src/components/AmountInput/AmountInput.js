import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import DropdownMenu from 'react-native-dropdown-menu'

export default class AmountInput extends React.Component {
    render() {
        const { data } = this.props
        return (
            <View style={styles.amountContainer}>
                <TextInput style={styles.unitInput} />
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
                        handler={(selection, row) => this.setState({ text: data[selection][row] })}
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
        marginRight: 10
    },
    unitPicker: {
        height: 53,
        width: 100,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#594343'
    }
})