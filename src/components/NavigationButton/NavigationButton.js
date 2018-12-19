import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class NavigationButton extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired
    }

  render () {
    const {title, onPress} = this.props

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        underlayColor='#fff'>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    )
  }
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
