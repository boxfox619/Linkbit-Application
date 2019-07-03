import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

const NavIcon = () => {
  return (
    <View>
      <Icon name={this.props.icon} color={this.props.color} />
      <Text style={{ color: this.props.color, textAlign: 'center' }}>{this.props.label}</Text>
    </View>
  )
}

NavIcon.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

NavIcon.defaultProps = {
  label: '',
  icon: 'android',
  color: '#000',
}

export default NavIcon