import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PinCodeView from './PinCodeView'
import FingerPrintView from './FingerPrintView'

const SecurityDetailView = (props => {
  const {view, onVerifySuccess} = props

  return (
    <>
      {
        view === 'pin' ?
          <PinCodeView onVerifySuccess={() => onVerifySuccess(false)} /> :
          <FingerPrintView onVerifySuccess={() => onVerifySuccess(false)} />
      }
    </>
  )
})
export default class SecurityView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isVerify: false,
      view: false,
    }
  }

  handleSetView = view => this.setState({view})
  handleVerifySuccess = view => this.setState({view, isVerify: true})

  render () {
    const {view} = this.state

    return (
      <View style={styles.container}>
        {
          view ? (
            <SecurityDetailView
              view={view}
              onVerifySuccess={this.handleVerifySuccess} />
          ):
            this.state.isVerify ?
              <>
                <TouchableOpacity
                  key={0}
                  style={styles.listItem}
                  onPress={() => this.handleSetView('pin')}>
                  <Text>핀 코드 변경</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  key={1}
                  style={styles.listItem}
                  onPress={() => this.handleSetView('finger')}>
                  <Text>지문 변경</Text>
                </TouchableOpacity>
              </> : (
                <PinCodeView
                  needVerify
                  onVerifySuccess={this.handleVerifySuccess} />
              )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
})
