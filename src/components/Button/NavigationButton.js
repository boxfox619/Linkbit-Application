import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const NavigationButton = (props) => {
  const { title, onPress } = props
  
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={styles.container}
      onPress={onPress}
      underlayColor='#fff'>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

NavigationButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    backgroundColor: '#594343',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default NavigationButton