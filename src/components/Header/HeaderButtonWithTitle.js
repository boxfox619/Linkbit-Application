import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export class HeaderButtonWithTitle extends React.Component {

    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onIconClicked: PropTypes.func.isRequired
    };

    static defaultProps = {
        icon: 'arrow-back',
        title: '',
        onIconClicked: () => {
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onIconClicked} style={{marginRight: 15}}>
                    <Icon name={this.props.icon} size={35}/>
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22
    }
});