import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Slider, Text } from 'react-native'
import { PRIMARY_COLOR } from '../../../libs/Constraints'

export default class CommissionInput extends React.Component {
    static propTypes = {
        commission: PropTypes.number.isRequired,
        onValueChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            commission: props.commission,
            onValueChange: props.onValueChange
        }
    }

    render() {
        const { commission, onValueChange } = this.state

        return (
            <View style={styles.container}>
                <Slider step={1}
                    minimumValue={0}
                    maximumValue={4}
                    maximumTrackTintColor={'#EBEBEB'}
                    minimumTrackTintColor={PRIMARY_COLOR}
                    onValueChange={onValueChange}
                    value={commission} />
                <View style={styles.gridContainer}>
                    <View style={styles.line} />
                    <View style={styles.line} />
                    <View style={styles.line} />
                    <View style={styles.line} />
                    <View style={styles.line} />
                </View>
                <Text style={styles.description}>{"수수료 금액에 따라서 전송 속도가 결정됩니다"}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    gridContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 14,
        justifyContent: 'space-between'
    },
    line: {
        width: 2,
        height: 10,
        borderRadius: 1,
        backgroundColor: 'gray'
    },
    description:{
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#A7A8AC',
        textAlign: 'center',
        paddingVertical: 40,
    }
})
