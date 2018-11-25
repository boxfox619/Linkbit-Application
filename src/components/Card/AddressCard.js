import React from 'react';
import PropTypes from 'prop-types';
import BorderCard from './BorderCard';
import {PRIMARY_COLOR} from '../../libs/Constraints';
import {View, StyleSheet, Text} from 'react-native';

export default class AddressCard extends React.Component {

    static propTypes = {
        address: PropTypes.string.isRequired,
        linkedAddressCount: PropTypes.number.isRequired,
        activate: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired
    }

    static defaultProps = {
        activate: false,
        onPress: () => {}
    }

    render() {
        const {address, linkedAddressCount, onPress, activate} = this.props
        return (
            <BorderCard onPress={onPress} activate={activate} themeColor={PRIMARY_COLOR}>
                <Text style={this.activeColor}>{address}</Text>
                {linkedAddressCount > 0 &&
                <Text style={[styles.connectState, styles.connected, this.activeColor]}>
                    {linkedAddressCount} connected
                </Text>}
                {linkedAddressCount === 0 && <Text style={[styles.connectState, this.activeColor]}>nothing connected</Text>}
            </BorderCard>
        )
    }

    get activeColor(){
        return {color: this.props.activate ? 'white' : ''};
    }
}

const styles = StyleSheet.create({
    connectState: {
        textAlign: 'right',
        color: 'black'
    },
    connected: {
        color: 'green'
    }
})