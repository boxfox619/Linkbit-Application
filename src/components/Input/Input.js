import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

export default class Input extends React.Component {
    render() {

        return (
            <View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} {...this.props} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#594343',
        borderRadius: 5,
        borderWidth: 3,
        height: 53,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 47,
        fontSize: 14,
        flexGrow: 1,
        marginHorizontal: 6,
    },
    title: {
        color: '#594343',
        fontSize: 14,
        fontWeight: 'bold',
        width: '100%',
        marginHorizontal: 'auto',
        marginTop: 20,
        marginBottom: 5,
    },
})