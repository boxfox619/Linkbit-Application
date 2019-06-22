import React from 'react'
import { View, Image } from 'react-native'
import { styles } from './styles'

const SplashView = () => {
    return (
        <View style={styles.splash}>
            <Image style={{ width: 270, height: 75 }} resizeMode="stretch" source={require('../../assets/ic_linkbit_logo.png')} />
        </View>
    )
}

export default SplashView;