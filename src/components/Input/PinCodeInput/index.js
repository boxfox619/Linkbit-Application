import React from 'react'
import { Animated, Text, View } from 'react-native'

import PropTypes from 'prop-types'
import KeyboardView from './KeyboardView'
import InputView from './InputView'
import Styles from './styles'

class PinCodeInputView extends React.Component {
  userInput = []

  constructor(props) {
    super(props)
    this.state = {
      animatedInputIndex: Object.assign([]),
      animatedDeleteButton: new Animated.Value(0),
      pinViewAnim: new Animated.Value(0),
      animatedDeleteButtonOnPress: true,
    }
  }
  setDeleteButton = (status) => {
    Animated.timing(
      // Animate value over time
      this.state.animatedDeleteButton, // The value to drive
      {
        toValue: status ? 1 : 0, // Animate to final value of 1
        duration: 100,
      },
    ).start() // Start the animation
    this.setState({
      animatedDeleteButtonOnPress: !status,
    })
  }

  clear = () => {
    this.userInput = []
    this.setState({
      animatedInputIndex: Object.assign([]),
      pinViewAnim: new Animated.Value(0),
    })
  }

  keyboardOnPress = (val, returnType, pinLength, onComplete) => {
    const animatedInputIndex = this.state.animatedInputIndex
    if (val === this.props.deleteText) {
      this.userInput = this.userInput.slice(0, -1)
      this.setState({
        animatedInputIndex: animatedInputIndex.slice(0, -1),
      })
      if (this.userInput.length === 0) {
        this.setDeleteButton(false)
      }
    } else {
      if (pinLength === this.userInput.length + 1) {
        this.userInput = this.userInput.concat(parseInt(val))
        this.setDeleteButton(true)
        this.setState({
          animatedInputIndex: animatedInputIndex.concat(this.userInput.indexOf(parseInt(val))),
        }, () => {
          if (returnType === 'string') {
            return onComplete(this.userInput.join(''), this.clear)
          } else if (returnType === 'array') {
            return onComplete(this.userInput, this.clear)
          } else {
            // console.log('Unkown return type!')
          }
        })
      } else {
        this.userInput = this.userInput.concat(parseInt(val))
        this.setDeleteButton(true)
        this.setState({
          animatedInputIndex: animatedInputIndex.concat(this.userInput.indexOf(parseInt(val))),
        })
      }
    }
  }

  render() {
    const { pinLength, buttonTextColor, returnType, buttonBgColor, inputBgColor, onComplete, disabled, inputActiveBgColor, inputBgOpacity, deleteText } = this.props

    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>{this.props.label}</Text>
        <View style={Styles.pin} pointerEvents={disabled ? 'none' : undefined}>
          <InputView
            bgOpacity={inputBgOpacity}
            pinLength={pinLength}
            activeBgColor={inputActiveBgColor}
            animatedInputIndex={this.state.animatedInputIndex}
            pinViewAnim={this.state.pinViewAnim}
            bgColor={inputBgColor}
            styles={[Styles.passwordInputView, Styles.passwordInputViewItem, Styles.passwordInputViewItemActive]} />
          <View style={Styles.keyboardView}>
            <KeyboardView
              styles={[Styles.keyboardViewItem, Styles.keyboardViewItemText]}
              bgColor={buttonBgColor}
              textColor={buttonTextColor}
              animatedDeleteButton={this.state.animatedDeleteButton}
              pinLength={pinLength}
              deleteText={deleteText}
              onComplete={(val, clear) => onComplete(val, clear())}
              animatedDeleteButtonOnPress={this.state.animatedDeleteButtonOnPress}
              keyboardOnPress={this.keyboardOnPress}
              returnType={returnType} />
          </View>
        </View>
      </View>
    )
  }
}

PinCodeInputView.defaultProps = {
  deleteText: 'DEL',
  buttonBgColor: '#FFF',
  buttonTextColor: '#333',
  inputBgColor: '#333',
  inputActiveBgColor: '#333',
  returnType: 'string',
  inputBgOpacity: 0.1,
  disabled: false,
  label: 'PIN 코드를 입력해주세요',
}
PinCodeInputView.propTypes = {
  disabled: PropTypes.bool,
  deleteText: PropTypes.string,
  returnType: PropTypes.string,
  buttonBgColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  inputBgColor: PropTypes.string,
  inputActiveBgColor: PropTypes.string,
  inputBgOpacity: PropTypes.number,
  onComplete: PropTypes.func.isRequired,
  pinLength: PropTypes.number.isRequired,
  label: PropTypes.string,
}

export default PinCodeInputView
