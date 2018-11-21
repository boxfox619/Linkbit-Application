import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class SegmentedControl extends React.Component {
    state = {
        selectedIndex: 1
    }

    renderOptions = () => {
        const { selectedIndex } = this.state
        const { options } = this.props

        return (options.map((option, index) => (
            <TouchableOpacity style={
                [styles.option,
                index === 0 ? null : styles.marginLeft,
                selectedIndex === index ? styles.selected : null]}
                onPress={() => this.setState({ selectedIndex: index })}>
                <Text style={[styles.optionName, selectedIndex === index ? styles.selectedText : null]}>{option}</Text>
            </TouchableOpacity>
        )))
    }

    render() {
        return (
            <View style={styles.optionContainer}>
                {
                    this.renderOptions()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    optionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    option: {
        borderColor: '#594343',
        borderRadius: 5,
        borderWidth: 3,
        height: 53,
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    marginLeft: {
        marginLeft: 10
    },
    optionName: {
        color: '#594343',
        textAlign: 'center',
        fontSize: 14,
    },
    selected: {
        borderColor: '#594343',
        backgroundColor: '#594343',
    },
    selectedText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
})