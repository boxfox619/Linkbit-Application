import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

export default class SettingListView extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        onItemSelected: PropTypes.func.isRequired
    }

    render() {
        const {list, onItemSelected} = this.props
        return (
            <View style={styles.container}>
                {
                    list.map(item => (
                        <TouchableOpacity
                            key={item.key}
                            style={styles.listItem}
                            onPress={() => onItemSelected(item.key)}>
                            <Text style={[styles.mainTxt, styles.labelStyle]}>{item.labelText}</Text>
                            <Text style={[styles.subTxt, styles.subLabelStyle]}>{item.subLabelText}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    mainTxt: {
        fontSize: 14,
    },
    subTxt: {
        fontSize: 10,
        color: '#808080',
        textAlign: 'right',
        marginLeft: 'auto',
    },
})