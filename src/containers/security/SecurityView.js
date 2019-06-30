import React from 'react'
import { observable } from 'mobx'
import { View, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import TouchID from 'react-native-touch-id'
import { handleTouchIdError } from '../../libs/ErrorHandler'
import PinCodeCreateView from './PinCodeCreateView'
import { SettingListView } from '../../components/List'
import i18n from '../../libs/Locale'
import { withVerify } from '../../components/HOC'

@inject(['setting'])
@observer
class SecurityView extends React.Component {
  static navigationOptions = () => {
    return {
      title: i18n.t('lock_mainTxt'),
      headerTitleStyle: { color: 'black' },
      headerStyle: { backgroundColor: 'white' },
    }
  }

  @observable label = i18n.t('pin_verify')
  @observable view = 'menu'

  get settings() {
    const { usePin, useFingerprint } = this.props.setting
    
    return [
      {
        labelText: i18n.t('pin'),
        subLabelText: usePin ? i18n.t('set') : i18n.t('unset'),
        key: 'pin',
      }, {
        labelText: i18n.t('finger'),
        subLabelText: useFingerprint ? i18n.t('set') : i18n.t('unset'),
        key: 'finger',
      },
    ]
  }

  handleViewSetting = view => {
    if (view === 'pin' && this.props.setting.pin) {
      this.props.setting.unsetPin().then(() => alert(i18n.t('finish_unset_pin')))
      
      return
    }
    this.view = view
    if (view === 'finger') return this.handleSetFingerprint()
  }
  handleSetPin = async pin => {
    await this.props.setting.setPin(pin)
    this.view = 'menu'
  }
  handleSetFingerprint = async () => {
    const { useFingerprint, setFingerprint } = this.props.setting
    if (useFingerprint) {
      await setFingerprint(false)
    }
    try {
      const res = await TouchID.authenticate(i18n.t('need_authentication'))
      await setFingerprint(res)
    } catch (err) {
      handleTouchIdError(err)
    }
  }

  render() {
    const view = this.view

    return (
      <View style={styles.container}>
        {
          view === 'pin' &&
          <PinCodeCreateView onPinEntered={this.handleSetPin} />
        }
        {
          (view === 'menu' || view === 'finger') && (
            <SettingListView
              list={this.settings}
              style={{ padding: 20 }}
              onItemSelected={this.handleViewSetting} />
          )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default withVerify(SecurityView, true)