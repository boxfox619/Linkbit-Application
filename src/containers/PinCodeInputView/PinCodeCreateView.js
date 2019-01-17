import React from 'react'
import PropTypes from 'prop-types'
import PinCodeView from '../../components/PinCodeInput'
import {observable} from 'mobx'
import {observer} from "mobx-react"

@observer
export default class PinCodeCreateView extends React.Component {
    @observable label = 'PIN 번호를 설정합니다'
    @observable prevPin

    static propTypes = {
        onPinEntered: PropTypes.func.isRequired
    }

    onPinEntered = (val) => {
        const {onPinEntered} = this.props
        if (!this.prevPin) {
            this.label = '핀 번호를 한번 더 입력해 주세요'
            this.prevPin = val
        } else {
            if (this.prevPin === val) {
                onPinEntered(val)
            } else {
                this.label = '핀 번호가 일치하지 않습니다'
                this.prevPin = undefined
            }
        }
    }

    render() {
        return (
            <PinCodeView
                label={this.label}
                onComplete={(val, clear) => this.onPinEntered(val, clear())}
                pinLength={5}/>
        )
    }
}
