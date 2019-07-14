import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Text } from 'react-native'
import BorderCard from './BorderCard'

const CoinItem = (props) => {
  const { coin, activate, onPress } = props
  const { name, symbol, themeColor, icon } = coin

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

CoinItem.propTypes = {
  coin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
    icon: PropTypes.number.isRequired,
  }).isRequired,
  activate: PropTypes.bool,
  onPress: PropTypes.func,
}

CoinItem.defaultProps = {
  activate: false,
  onPress: () => { },
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

export default CoinItem