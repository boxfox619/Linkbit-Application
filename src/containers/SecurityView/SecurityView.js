import React from 'react'
import {View, StyleSheet} from 'react-native'
import PinCodeCreateView from '../PinCodeInputView/PinCodeCreateView'
import {inject, observer} from 'mobx-react'
import {observable} from 'mobx'
import {checkForFingerprint} from '../../libs/Fingerprint'
import SettingListView from '../SettingView/SettingListView'
import PinCodeView from '../../components/PinCodeInput'

@inject(['setting'])
@observer
export default class SecurityView extends React.Component {
  @observable label = '설정을 위해 PIN 번호를 입력해주세요'
  @observable view = 'verify'

  componentDidMount() {
    const pin = this.props.setting.pin
    this.view = !!pin ? 'verify' : 'menu'
  }

  handleViewSetting = view => {
    this.view = view
    if (view === 'finger') {
      this.handleSetFingerprint()
    }
  }
  handleSetPin = async pin => {
    await this.props.setting.setPin(pin)
    this.view = 'menu'
  }
  handlePinVerify = (pin) => {
    if (this.props.setting.pin === pin) {
      this.view = 'menu'
    } else {
      this.label = 'PIN 번호가 일치하지 않습니다'
    }
  }
  handleSetFingerprint = async () => {
    const {getFingerprint, setFingerprint} = this.props.settings
    if (await getFingerprint) {
      return this.handleOffFingerprint()
    }
    const finger = await checkForFingerprint(true)
    await setFingerprint(finger)
    this.view = await 'menu'
  }
  handleOffFingerprint = async () => {
    return this.props.setting.setFingerprint(false)
  }

  render() {
    const view = this.view

    return (
      <View style={styles.container}>
        {view === 'pin' && (<PinCodeCreateView onPinEntered={this.handleSetPin}/>)}
        {(view === 'menu' || view === 'finger') && (
          <SettingListView list={this.settings}
                           style={{padding: 20}}
                           onItemSelected={this.handleViewSetting}/>
        )}
        {view === 'verify' && (
          <PinCodeView
            label={this.label}
            onComplete={this.handlePinVerify}
            pinLength={5}/>
        )}
      </View>
    )
  }

  get settings() {
    const {pin, useFingerprint} = this.props.setting
    return [
      {
        labelText: '핀 코드 변경',
        subLabelText: !!pin ? '설정됨' : '설정되지 않음',
        key: 'pin',
      }, {
        labelText: '지문 변경',
        subLabelText: useFingerprint ? '사용중' : '사용하지 않음',
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
