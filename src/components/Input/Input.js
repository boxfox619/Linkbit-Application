import React from 'react'
import {View, StyleSheet, TextInput} from 'react-native'

export default class Input extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} {...this.props} />
            </View>
        )
    }
}

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