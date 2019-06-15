export const handleError = (err) => {

    console.error(err)
}

export const handleTouchIdError = (err) => {
    if (err.name === 'LAErrorTouchIDNotEnrolled') {
        alert('Touch ID 또는 Face ID가 지원되지 않습니다')
    } else {
        alert('인증을 실패했습니다')
    }
}