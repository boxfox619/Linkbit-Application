import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { PassCodeInput } from '../../components'

export default class PassCodeView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      label: 'PIN 번호를 설정합니다',
    }
  }

  onPinEntered = (val) => {
    if (!this.state.prevPin) {
      this.setState({
        label: '핀 번호를 한번 더 입력해 주세요',
        prevPin: val,
      })
    } else {
      if (this.state.prevPin === val) {
        alert('success')
      } else {
        this.setState({
          label: '핀 번호가 일치하지 않습니다',
          prevPin: undefined,
        })
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.label}</Text>
        <PassCodeInput
          style={styles.pin}
          onComplete={(val, clear) => this.onPinEntered(val, clear())}
          pinLength={5}
          inputActiveBgColor="#e8a93a" />
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
