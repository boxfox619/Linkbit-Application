import React from 'react'
import {View, StyleSheet, Dimensions, Text} from 'react-native'
import PinCodeInput from '../../components/PinCodeInput/index'

export default class PinCodeView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            label: '새로운 PIN 번호를 입력해주세요',
            originPin: '11111',
            newPin: undefined,
        }
    }

    handleVerifyPinCode = (inputPin, onVerifySuccess) => {
        const targetPin = this.state.newPin || this.state.originPin

        if (targetPin === inputPin) {
            this.setState({
                originPin: inputPin,
            })
            onVerifySuccess()
        } else {
            this.setState({
                label: '핀 번호가 일치하지 않습니다.\n다시 시도해주세요.',
                newPin: undefined,
            })
        }
    }

    handleChangePinCode = newPin => {
        this.setState({
            label: '새로운 PIN 번호를 확인해주세요',
            newPin,
        })
    }

    render() {
        const {needVerify, onVerifySuccess} = this.props
        const {label, newPin} = this.state

        return (
            <PinCodeInput
                label={needVerify ? 'PIN 번호를 입력해주세요' : label}
                onComplete={(val, clear) => newPin || needVerify ?
                    this.handleVerifyPinCode(val, onVerifySuccess, clear()) :
                    this.handleChangePinCode(val, clear())}
                pinLength={5}
                inputActiveBgColor='#e8a93a'/>
        )
    }
}