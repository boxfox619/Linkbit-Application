import {Platform} from 'react-native'

export const checkForFingerprints = async isSetting => {
  let records = await Expo.LocalAuthentication.isEnrolledAsync()

  if (!records) {
    isSetting &&
    alert('Please ensure you have set up biometrics in your OS settings.')
  } else {
    await handleLoginPress()
    records = await Expo.LocalAuthentication.isEnrolledAsync()
  }

  return records
}

export const handleLoginPress = () => {
  if (Platform.OS === 'android') {
    this.showAndroidAlert()
  } else {
    this.scanFingerprint()
  }
}

export const showAndroidAlert = () => {
  Alert.alert('Fingerprint Scan', 'Place your finger over the touch sensor.')
  this.scanFingerprint()
}

export const scanFingerprint = async () => {
  let result = await Expo.LocalAuthentication.authenticateAsync('Biometric Scan.')
  if (!result.success) {
    //TODO Try Again 뜨는지 확인
    //TODO Enter Password 작동확인
    // Cancel
    alert('error')
  }
}
