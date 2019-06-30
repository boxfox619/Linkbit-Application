import React from 'react'
import { View, Image, Text } from 'react-native'
import { styles } from './styles'

const SplashView = ({ label }) => {
    return (
        <View style={styles.splash}>
            <Image style={{ width: 270, height: 75 }} resizeMode="stretch" source={require('../../assets/ic_linkbit_logo.png')} />
            <Text style={styles.statusLabel}>{label}</Text>
        </View>
    )
}

export default SplashView;