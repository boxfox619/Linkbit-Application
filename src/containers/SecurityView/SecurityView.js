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
      creatingPassCode: false,
      creatingFingerprint: false,
    }
  }

  enrolledFingerPrint = async () => {
    const fingerprint = await Expo.Fingerprint.isEnrolledAsync()
    this.props.updateSetting('fingerPrint', fingerprint)
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
  scanFingerprint = async () => {
    const result = await Expo.Fingerprint.authenticateAsync(i18n.t('confirm_fingerprint'))
    if (result.success) {
      alert('success')
      this.props.isUnlocked()
    } else {
      alert('failed')
      console.log(result)
    }
  }
  authFingerPrint = () => {
    Platform.OS === 'android' ?
      this.showAndroidAlert() :
      this.scanFingerprint()
  }

  handleChangeSwitch = (key, val) => {
    this.setState({
      [key]: val,
      creatingPassCode: key === 'isPassCodeActive' && val,
      creatingFingerprint: key === 'isFingerPrintActive' && val,
    }, () => {
      this.state.creatingFingerprint && this.handleSetFingerPrint()
    })
  }
  handleSetPassCode = () => {
    this.setState({
      creatingPassCode: false
    })
  }
  handleSetFingerPrint = () => {
    this.enrolledFingerPrint()
    this.authFingerPrint()
  }
  handleAuthProcess = isLocked => {
    this.props.getFingerPrint() && this.authFingerPrint()

    return <PassCodeView onVerify={isLocked ? this.props.isUnlocked : this.handleSetPassCode}/>
  }

  render () {
    const { isLocked } = this.props
    const {isPassCodeActive, creatingPassCode} = this.state
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
          isLocked || creatingPassCode ?
            this.handleAuthProcess(isLocked) :
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
