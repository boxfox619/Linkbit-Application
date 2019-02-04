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
    return showAndroidAlert()
  } else {
    return scanFingerprint()
  }
}

export const showAndroidAlert = () => {
  Alert.alert('Fingerprint Scan', 'Place your finger over the touch sensor.')
  return scanFingerprint()
}

export const scanFingerprint = () => {
  return Expo.LocalAuthentication.authenticateAsync('Biometric Scan.')
}
