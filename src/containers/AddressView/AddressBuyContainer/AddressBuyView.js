import React from 'react'
import {View, StyleSheet} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import {PRIMARY_COLOR} from '../../../libs/Constraints'

@observer
export default class AddressBuyView extends React.Component {
    @observable errMessage = undefined
    @observable addressIsValid = false

    static get options() {
      return {topBar: {title: {text: '주소 구매'}}}
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.form}>
            <FormLabel>Address</FormLabel>
            <FormInput onChangeText={this.addressValidCheck} />
            {this.errMessage &&
            <FormValidationMessage>{this.errMessage}</FormValidationMessage>
            }
          </View>
          <Button
            title="다음"
            onPress={this.onNext}
            buttonStyle={styles.getAddressButton}
            disabled={!this.addressIsValid} />
        </View>
      )
    }

    onNext = () => {
      if(this.addressIsValid){
        this.props.navigation.navigate('AddressBuyPricing')
      }
    }

    addressValidCheck = (text) => {
      if(text.length>0){
        this.addressIsValid = true
      }
      //@ TODO implement checker of address is valid
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
  form: {
    flex:1,
  },
  getAddressButton: {
    backgroundColor: PRIMARY_COLOR,
  },
})