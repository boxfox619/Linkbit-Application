import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import PinCodeInput from '../../components/PinCodeInput/index'

export default class PinCodeView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      label: '새로운 PIN 번호를 입력해주세요',
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
        label: '핀 번호가 일치하지 않습니다.\n다시 시도해주세요.',
        newPin: undefined,
      })
    }
  }

  handleChangePinCode = newPin => {
    this.setState({
      label: '새로운 PIN 번호를 확인해주세요',
      newPin,
    })
  }

  render () {
    const {needVerify, onVerifySuccess} = this.props
    const {label, newPin} = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {needVerify ? 'PIN 번호를 입력해주세요' : label}
        </Text>
        <PinCodeInput
          style={styles.pin}
          onComplete={(val, clear) => newPin || needVerify ?
            this.handleVerifyPinCode(val, onVerifySuccess, clear()) :
            this.handleChangePinCode(val, clear())}
          pinLength={5}
          inputActiveBgColor='#e8a93a'/>
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
