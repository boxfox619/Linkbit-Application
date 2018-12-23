import React from 'react'
import { Platform, View, FlatList, Switch, Text, StyleSheet } from 'react-native'
import i18n from '../../libs/Locale'
import PassCodeView from './PassCodeView'

export default class SecurityView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isPassCodeActive: false,
      isFingerPrintActive: false,
      isSetPassCode: false,
      isSetFingerprint: false,
      compatible: false,
    }
  }

  checkDeviceForHardware = async () => {
    const compatible = await Expo.Fingerprint.hasHardwareAsync()
    this.setState({compatible})
  }
  checkForFingerprints = async () => {
    const fingerprint = await Expo.Fingerprint.isEnrolledAsync()
    this.props.updateSetting('fingerprint', fingerprint)
  }
  scanFingerprint = async () => {
    const fingerprint = await Expo.Fingerprint.authenticateAsync(i18n.t('confirm_fingerprint'))
  }
  showAndroidAlert = () => {
    Alert.alert(
      'Fingerprint Scan',
      '',
      [
        {text: 'Scan', onPress: () => this.scanFingerprint},
        {text: 'Cancel', onPress: () => this.handleChangeSwitch('isFingerPrintActive', false), style: 'cancel'}
      ]
    )
  }

  handleChangeSwitch = (key, val) => {
    this.setState({
      [key]: val,
      isSetPassCode: key === 'isPassCodeActive' && val,
      isSetFingerprint: key === 'isFingerPrintActive' && val,
    }, () => {
      this.state.isSetFingerprint && this.handleSetFingerPrint()
    })
  }
  handleSetPassCode = () => {
    this.setState({
      isSetPassCode: false
    })
  }
  handleSetFingerPrint = () => {
    this.checkDeviceForHardware()
    this.checkForFingerprints()

    Platform.OS === 'android' ?
      this.showAndroidAlert() :
      this.scanFingerprint()
  }

  render () {
    const {isPassCodeActive, isSetPassCode} = this.state
    const securityList = [{
      key: 'isPassCodeActive',
      txt: i18n.t('lock_pw'),
    }, {
      key: 'isFingerPrintActive',
      txt: i18n.t('lock_finger'),
    }]

    !isPassCodeActive && securityList.pop()

    return (
      <View style={styles.container}>
        {
          isSetPassCode ?
            <PassCodeView onSetPassCode={this.handleSetPassCode}/> :
            <FlatList
              data={securityList}
              renderItem={({item}) => <View style={styles.listItem}>
                <Text>{item.txt}</Text>
                <Switch style={styles.switch}
                        value={this.state[item.key]}
                        onValueChange={val => this.handleChangeSwitch(item.key, val)}/>
              </View>}/>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  switch: {
    textAlign: 'right',
    marginLeft: 'auto',
  }
})
