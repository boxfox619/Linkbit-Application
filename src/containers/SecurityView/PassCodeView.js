import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import UserStore from '../../store/UserStore'
import i18n from '../../libs/Locale'
import { PassCodeInput } from '../../components'

export default class PassCodeView extends React.Component {

  constructor (props) {
    super(props)
    this.store = UserStore
    this.state = {
      label: i18n.t('new_passcode'),
      originPin: this.store.getPassCode,
      newPin: undefined,
    }
  }

  handleVerifyPassCode = (inputPin, onVerify) => {
    const targetPin = this.state.newPin || this.state.originPin

    if (targetPin === inputPin) {
      this.setState({
        originPin: inputPin,
      })
      this.store.updateSetting('passCode', inputPin)
      onVerify()
    } else {
      this.setState({
        label: i18n.t('verify_PassCode'),
        newPin: undefined,
      })
    }
  }

  handleChangePassCode = newPin => {
    this.setState({
      label: i18n.t('verify_passcode'),
      newPin,
    })
  }

  render () {
    const { needVerify, onVerify } = this.props
    const { label, newPin } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {needVerify ? i18n.t('check_passcode') : label}
        </Text>
        <PassCodeInput
          style={styles.pin}
          onComplete={(val, clear) => newPin || needVerify ?
            this.handleVerifyPassCode(val, onVerify, clear()) :
            this.handleChangePassCode(val, clear())}
          pinLength={5}
          inputActiveBgColor='#e8a93a' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  pin: {
    position: 'absolute',
    bottom: 0,
  },
})
