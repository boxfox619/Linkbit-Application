import React from 'react'
import { View, Text, ActivityIndicator, Modal } from 'react-native'

const withProgressDialog = Component => class WithProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = { label: 'Loading', visible: false }
  }

  componentDidUpdate() {
    const callback = this.state.callback
    callback && setTimeout(() => {
      callback()
    }, 500)
  }

  setVisible = (visible, label, callback) => {
    this.setState({ visible, label, callback })
  }

  render() {
    return (
      <>
        {this.state.visible && (
          <Modal transparent onRequestClose={this.setVisible.apply(this, false)}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
              <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: '200' }}>{this.state.label || 'loading'}</Text>
                <ActivityIndicator size="large" />
              </View>
            </View>
          </Modal>
        )
        }
        <Component {...this.props} showProgress={this.setVisible} />
      </>
    )
  }
}

export default withProgressDialog