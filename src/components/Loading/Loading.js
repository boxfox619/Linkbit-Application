import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

export default class Loading extends React.Component {
    state = {
        isLoading: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isLoading: nextProps.isLoading == true })
    }

    render() {
        const { isLoading } = this.props

        return (
            isLoading &&
            <View style={styles.indicatorBackground}>
                <ActivityIndicator style={styles.indicator}
                    size="large"
                    color="#cccccc" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    indicatorBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
    },
    indicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})
