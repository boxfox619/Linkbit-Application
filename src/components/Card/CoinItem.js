import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Text } from 'react-native'
import BorderCard from './BorderCard'

export default class CoinItem extends React.Component {

    static propTypes = {
      coin: PropTypes.object.isRequired,
      activate: PropTypes.bool.isRequired,
      onPress: PropTypes.func,
    }

    static defaultProps = {
      activate: false,
    }

    render() {
      const { coin, activate, onPress } = this.props
      const {name, symbol, themeColor, icon} = coin
      
      return (
        <BorderCard themeColor={themeColor} activate={activate} onPress={onPress}>
          <View style={styles.container}>
            <Image style={styles.icon} source={icon} resizeMode="contain" />
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: activate ? 'white' : themeColor }]}>{name}</Text>
              <Text style={[styles.subtitle, { color: activate ? 'white' : themeColor }]}>{symbol}</Text>
            </View>
          </View>
        </BorderCard>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  icon: {
    height: 40,
    width: 40,
  },
  titleContainer: {
    paddingStart: 10,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.5,
  },
})