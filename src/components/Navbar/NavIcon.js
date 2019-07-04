import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

const NavIcon = (props) => {
  return (
    <View>
      <Icon name={props.icon} color={props.color} />
      <Text style={{ color: props.color, textAlign: 'center' }}>{props.label}</Text>
    </View>
  )
}

NavIcon.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
}

NavIcon.defaultProps = {
  label: '',
  icon: 'android',
  color: '#000',
}

export default NavIcon