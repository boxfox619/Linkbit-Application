import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TextInput} from 'react-native'
import DropdownMenu from 'react-native-dropdown-menu'
import AmountBox from "../AmountBox/AmountBox";
import Input from "../../../components/Input/Input";

export default class AmountInput extends React.Component {
    static propTypes = {
        symbol: PropTypes.string.isRequired,
        moneySymbol: PropTypes.string.isRequired,
        amount: PropTypes.any.isRequired,
        price: PropTypes.any.isRequired,
        selectedSymbol: PropTypes.string.isRequired,
        onChangeAmount: PropTypes.func.isRequired,
        onChangeSymbol: PropTypes.func.isRequired,
        edit: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired
    }

    render() {
        const {amount, price, symbol, selectedSymbol, moneySymbol, onChangeAmount, onChangeSymbol, edit, onPress} = this.props
        const symbols = [[symbol, moneySymbol]];
        const amountValue = selectedSymbol === symbol ? amount : price;
        return (
            <View style={styles.amountContainer}>
                {edit ? (
                    <>
                        <Input
                            placeholder='0'
                            keyboardType='numeric'
                            returnKeyType='done'
                            value={String(amountValue)}
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
                    </>
                ) : (
                    <AmountBox price={price}
                               moneySymbol={moneySymbol}
                               symbol={symbol}
                               amount={amount}
                               onPress={onPress}/>
                )}
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
    unitPicker: {
        height: 53,
        width: 100,
        marginLeft: 6,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#594343',
    },
})
