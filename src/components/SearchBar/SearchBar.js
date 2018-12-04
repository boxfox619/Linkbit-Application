import React from 'react'
import { View, StyleSheet, Image, TextInput } from 'react-native'

const searchBarIcon = require('./img/search.png')

export default class SearchBar extends React.Component {
    render() {
        return (
            <View style={styles.searchBar}>
                <Image style={styles.searchBarIcon}
                    source={searchBarIcon} />
                <View style={styles.divider} />
                <TextInput style={styles.searchBarInput} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#594343',
        borderRadius: 5,
        borderWidth: 3,
        height: 53,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center'
    },
    searchBarIcon: {
        width: 47,
        height: 47,
        transform: [{
            scale: 0.5
        }]
    },
    searchBarInput: {
        height: 47,
        fontSize: 14,
        lineHeight: 14,
        flexGrow: 1,
        marginHorizontal: 6
    },
    divider: {
        width: 1,
        height: 25,
        backgroundColor: '#EAEAEA',
    },
})