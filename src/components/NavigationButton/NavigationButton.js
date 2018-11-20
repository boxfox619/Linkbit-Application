import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class NavigationButton extends React.Component {
    static propTypes = {
        symbol: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
        linkedAddress: PropTypes.string.isRequired,
        accountAddress: PropTypes.string.isRequired
    };
    render() {
        const { title, onPress } = this.props;
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={onPress}
                underlayColor='#fff'>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        width: '100%',
        backgroundColor: '#594343',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold'
    }
});