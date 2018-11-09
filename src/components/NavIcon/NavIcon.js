import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

export default class NavIcon extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    };

    static defaultProps = {
        label: '',
        icon: 'android',
        color: '#000'
    };

    render() {
        return (
            <View>
                <Icon name={this.props.icon} color={this.props.color}/>
                <Text style={{color: this.props.color}}>{this.props.label}</Text>
            </View>
        )
    }
}