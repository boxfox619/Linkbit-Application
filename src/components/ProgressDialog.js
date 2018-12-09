import React from 'react'
import PropTypes from 'prop-types'
import { Modal, View, Text, ActivityIndicator } from 'react-native'

export default class ProgressDialog extends React.Component {
    static propTypes = {
      label: PropTypes.string,
    }
    static defaultProps = {
      label: 'Loading2',
    }

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <Modal onRequestClose={() => null}>
          <View style={{flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{borderRadius: 10, backgroundColor: 'white', padding: 25}}>
              <Text style={{fontSize: 20, fontWeight: '200'}}>{this.props.label}</Text>
              <ActivityIndicator size="large" />
            </View>
          </View>
        </Modal>
      )
    }
}