import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import BorderCard from './BorderCard'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import i18n from '../../libs/Locale'

export default class AddressCard extends React.Component {

  static propTypes = {
    address: PropTypes.string.isRequired,
    linkedAddressCount: PropTypes.number.isRequired,
    activate: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  }

  static defaultProps = {
    activate: false,
    onPress: () => { },
    onLongPress: () => { },
  }

  get activeColor() {
    return { color: this.props.activate ? 'white' : 'black' }
  }

  render() {
    const { address, linkedAddressCount, onPress, onLongPress, activate } = this.props

    return (
      <BorderCard
        onPress={onPress}
        onLongPress={onLongPress}
        activate={activate}
        themeColor={PRIMARY_COLOR}>
        <Text style={this.activeColor}>{address}</Text>
        {linkedAddressCount > 0 && (
          <Text
            style={[styles.connectState, styles.connected, this.activeColor]}>
            {linkedAddressCount}
            {' ' + i18n.t('connected')}
          </Text>
        )}
        {linkedAddressCount === 0 && (
          <Text style={[styles.connectState, this.activeColor]}>
            {' ' + i18n.t('no_connected')}
          </Text>
        )}
      </BorderCard>
    )
  }
}

const styles = StyleSheet.create({
  connectState: {
    textAlign: 'right',
    color: 'black',
  },
  connected: {
    color: 'green',
  },
})
