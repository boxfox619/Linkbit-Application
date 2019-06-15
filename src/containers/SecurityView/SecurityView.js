import React from 'react'
import { View, StyleSheet } from 'react-native'
import PinCodeCreateView from '../PinCodeInputView/PinCodeCreateView'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import SettingListView from '../SettingView/SettingListView'
import PinCodeView from '../../components/PinCodeInput'
import i18n from '../../libs/Locale'
import TouchID from 'react-native-touch-id'

@inject(['setting'])
@observer
export default class SecurityView extends React.Component {
  static navigationOptions = () => {
    return {
      title: i18n.t('lock_mainTxt'),
      headerTitleStyle: { color: 'black' },
      headerStyle: { backgroundColor: 'white' },
    }
  }

  @observable label = i18n.t('pin_verify')
  @observable view = 'verify'

  componentDidMount() {
    const pin = this.props.setting.pin
    this.view = !!pin ? 'verify' : 'menu'
  }

  handleViewSetting = view => {
    this.view = view
    if (view === 'finger') return this.handleSetFingerprint()
  }
  handleSetPin = async pin => {
    await this.props.setting.setPin(pin)
    this.view = 'menu'
  }
  handlePinVerify = (pin) => {
    if (this.props.setting.pin === pin) {
      this.view = 'menu'
    } else {
      this.label = i18n.t('wrong_pin')
    }
  }
  handleSetFingerprint = async () => {
    const { useFingerprint, setFingerprint } = this.props.setting
    if (useFingerprint) {
      await setFingerprint(false)
    }
    try {
      const res = await TouchID.authenticate('to demo this react-native component')
      await setFingerprint(res)
    } catch (err) {
      if (err.name === 'LAErrorTouchIDNotEnrolled') {
        alert('Touch ID 또는 Face ID가 지원되지 않습니다')
      } else {
        alert('인증을 실패했습니다')
      }
    }
  }

  render() {
    const view = this.view

    return (
      <View style={styles.container}>
        {
          view === 'pin' &&
          <PinCodeCreateView
            onPinEntered={this.handleSetPin} />
        }
        {
          (view === 'menu' || view === 'finger') &&
          <SettingListView
            list={this.settings}
            style={{ padding: 20 }}
            onItemSelected={this.handleViewSetting} />
        }
        {
          view === 'verify' &&
          <PinCodeView
            label={this.label}
            onComplete={this.handlePinVerify}
            pinLength={5} />
        }
      </View>
    )
  }

  get settings() {
    const { pin, useFingerprint } = this.props.setting
    return [
      {
        labelText: i18n.t('pin'),
        subLabelText: !!pin ? i18n.t('set') : i18n.t('unset'),
        key: 'pin',
      }, {
        labelText: i18n.t('finger'),
        subLabelText: useFingerprint ? i18n.t('set') : i18n.t('unset'),
        key: 'finger',
      }
    ]
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
