import React from 'react'
import withTitle from '../HOC/withTitle'
import { View, StyleSheet, TextInput } from 'react-native'

export const Input = ({containerStyle = {}, ...props}) => {
    return (
        <View style={{...styles.container, ...containerStyle}}>
            <TextInput style={styles.input} {...props} />
        </View>
    )
}

export default Input

export const InputWithTitle = withTitle(Input)

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#594343',
        borderRadius: 5,
        borderWidth: 3,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 14,
        flexGrow: 1,
        marginHorizontal: 6,
        paddingVertical: 15
    },
})