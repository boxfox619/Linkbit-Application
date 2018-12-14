import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'

export default class Coin extends React.Component {
    state = {
        isHighlighted: false
    }

    componentDidMount() {
        this.setState({ isHighlighted: this.props.isHighlighted })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isHighlighted: nextProps.isHighlighted })
    }

    render() {
        const { name, symbol, icon, themeColor, updateSelectedIndex } = this.props
        const { isHighlighted } = this.state
        return (
            <TouchableOpacity style={[styles.container, { borderColor: themeColor, backgroundColor: isHighlighted ? themeColor : 'white' }]}
                onPress={updateSelectedIndex}>
                <Image style={styles.icon}
                    source={icon} />
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: isHighlighted ? 'white' : themeColor }]}>{name}</Text>
                    <Text style={[styles.subtitle, { color: isHighlighted ? 'white' : themeColor }]}>{symbol}</Text>
                </View>
            </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 5,
        borderWidth: 3,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 3,
        position: 'relative',
    },
    icon: {
        width: 40,
        height: 40,
    },
    titleContainer: {
        paddingStart: 10,
    },
    title: {
        fontSize: 16
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.5
    }
})