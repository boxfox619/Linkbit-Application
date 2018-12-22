import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import PinCodeInput from '../../components/PinCodeInput/index'
import i18n from '../../libs/Locale'

export default class PassCodeView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      label: i18n.t('new_passcode'),
      originPin: '11111',
      newPin: undefined,
    }
  }

  handleVerifyPinCode = (inputPin, onVerifySuccess) => {
    const targetPin = this.state.newPin || this.state.originPin

    if (targetPin === inputPin) {
      this.setState({
        originPin: inputPin,
      })
      onVerifySuccess()
    } else {
      this.setState({
        label: i18n.t('verify_passcode'),
        newPin: undefined,
      })
    }
  }

  handleChangePinCode = newPin => {
    this.setState({
      label: i18n.t('verify_passcode'),
      newPin,
    })
  }

  render () {
    const {needVerify, onVerifySuccess} = this.props
    const {label, newPin} = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {needVerify ? i18n.t('check_passcode') : label}
        </Text>
        <PinCodeInput
          style={styles.pin}
          onComplete={(val, clear) => newPin || needVerify ?
            this.handleVerifyPinCode(val, onVerifySuccess, clear()) :
            this.handleChangePinCode(val, clear())}
          pinLength={5}
          inputActiveBgColor='#e8a93a' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 30,
    width: Dimensions.get('window').width,
  },
  pin: {
    position: 'absolute',
    bottom: 0,
  },
})
