import React from 'react'
import {ProgressDialog} from '../'

const withProgressDialog = Component => class WithProgress extends React.Component {
    constructor(props){
        super(props)
        this.state = { label: 'Loading', visible: false }
    }
    render() {
        return (
            <>
                <ProgressDialog label={this.state.label} visible={this.state.visible} />
                <Component {...this.props} showProgress={this.setVisible} />
            </>
        )
    }

    setVisible = (visible, label) => {
        this.setState({visible, label: label});
    }
}

export default withProgressDialog