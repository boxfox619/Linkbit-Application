import i18n from './Locale'

export const handleError = () => {
  
}

export const handleTouchIdError = (err) => {
  if (err.name === 'LAErrorTouchIDNotEnrolled') {
    alert(i18n.t('not_support_touch_id'))
  } else {
    alert(i18n.t('failed_authentication'))
  }
}