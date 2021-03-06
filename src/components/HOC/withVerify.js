import React from 'react'
import { inject, observer } from 'mobx-react'
import TouchID from 'react-native-touch-id'
import i18n from '../../libs/Locale'
import { PinCodeView } from '..'
import { handleTouchIdError, handleError } from '../../libs/ErrorHandler'

const withVerify = (Component, defaultVisible = false) => inject(['setting'])(observer((class withPinVerify extends React.Component {
  constructor(props) {
    super(props)
    const visible = defaultVisible && this.props.setting.usePin
    this.state = { label: i18n.t('pin_verify'), visible, verified: false, callback: undefined }
  }

  setVisible = (callback) => {
    this.setState({ callback }, () => {
      const { usePin, useFingerprint } = this.props.setting
      if (useFingerprint) {
        TouchID.authenticate(i18n.t('need_authentication'))
          .then(() => {
            this.response(true)
            this.setState({ verified: true })
          })
          .catch(error => {
            handleError(error)
            handleTouchIdError(error)
            this.setState({ verified: false })
            this.response(false)
          })

        return
      }
      if (!usePin) {
        this.response(true)
        this.setState({ verified: true })
      } else {
        this.setState({ visible: true, verified: false })
      }
    })
  }

  handlePinVerify = inputPin => {
    if (this.props.setting.pin === inputPin) {
      this.response(true)
      this.setState({ visible: false, verified: true })
    } else {
      this.setState({ label: i18n.t('wrong_pin'), verified: false })
    }
  }

  response = (status) => {
    this.state.callback && this.state.callback(status)
  }

  render() {
    return (
      <>
        {(this.state.visible) ? (
          <PinCodeView
            label={this.state.label}
            onComplete={this.handlePinVerify}
            pinLength={5} />
        ) : (
          <Component {...this.props} verified={this.state.verified} requestVerify={this.setVisible} />
        )}
      </>
    )
  }
})))

export default withVerify