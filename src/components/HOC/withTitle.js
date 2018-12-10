import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const withTitle = Component => ({ title, ...props }) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <Component {...props}/>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default withTitle