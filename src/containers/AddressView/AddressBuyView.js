import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements'
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {Navigation} from 'react-native-navigation'

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
                <FormLabel>Address</FormLabel>
                <FormInput onChangeText={this.addressValidCheck}/>
                {this.errMessage &&
                <FormValidationMessage>{this.errMessage}</FormValidationMessage>
                }
                <Button title={"다음"} onPress={this.onNext} disabled={!this.addressIsValid}/>
            </View>
        )
    }

    onNext = () => {
        if(this.addressIsValid){
            Navigation.push(this.props.componentId, {component: {name : 'AddressBuyPricing'}})
        }
    }

    addressValidCheck = (text) => {
        //@ TODO implement checker of address is valid
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})