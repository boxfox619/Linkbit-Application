import React from 'react'
import { View, Text, Image } from 'react-native'
import { styles } from './styles'

const SplashView = () => {
    return (
        <View style={styles.splash}>
            <Image
                style={styles.image}
                source={require('../../assets/ic_linkbit.png')} />
            <Text style={styles.titleLabel}>Linkbit</Text>
            <Text style={styles.subLabel}>
                더 편리한 암호화폐
              </Text>
        </View>
    )
}

export default SplashView;