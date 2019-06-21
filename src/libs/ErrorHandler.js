import i18n from '../../libs/Locale'

export const handleError = (err) => {

    console.error(err)
}

export const handleTouchIdError = (err) => {
    if (err.name === 'LAErrorTouchIDNotEnrolled') {
        alert(i18n.t('not_support_touch_id'))
    } else {
        alert(i18n.t('failed_authentication'))
    }
}