import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Text } from 'react-native'
import {HOST} from '../../libs/Constraints'
import BorderCard from './BorderCard'

export default class CoinItem extends React.Component {

    static propTypes = {
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      themeColor: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      activate: PropTypes.bool.isRequired,
    }

    static defaultProps = {
      activate: false,
    }

    render() {
      const { name, symbol, themeColor, activate, onPress } = this.props
      
      return (
        <BorderCard themeColor={themeColor} activate={activate} onPress={onPress}>
          <View style={styles.container}>
            <Image style={styles.icon} source={{uri: `${HOST}/assets/${symbol}.png`}} resizeMode="contain" />
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