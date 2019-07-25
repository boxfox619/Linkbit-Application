import {Alert} from 'react-native'
import i18n from './Locale'

export const handleError = (err) => {
  console.error(err)
}

export const handleTouchIdError = (err) => {
  if (err.name === 'LAErrorTouchIDNotEnrolled') {
    Alert.alert(i18n.t('not_support_touch_id'))
  } else {
    Alert.alert(i18n.t('failed_authentication'))
  }
}