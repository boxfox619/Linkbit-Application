import React from 'react'
import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { PinCodeInputView } from '../../components/Input'
import i18n from '../../libs/Locale'

@observer
export default class PinCodeCreateView extends React.Component {

  static propTypes = {
    onPinEntered: PropTypes.func.isRequired,
  }

  @observable label = i18n.t('pin_setting')
  @observable prevPin = ''

  onPinEntered = (val) => {
    const { onPinEntered } = this.props
    if (!this.prevPin) {
      this.label = i18n.t('enter_pin_verify')
      this.prevPin = val
    } else {
      if (this.prevPin === val) {
        onPinEntered(val)
      } else {
        this.label = i18n.t('worng_pin')
        this.prevPin = undefined
      }
    }
  }

  render() {
    return (
      <PinCodeInputView
        label={this.label}
        onComplete={this.onPinEntered}
        pinLength={5} />
    )
  }
}
