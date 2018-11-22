import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements'
import {observer} from 'mobx-react';
import {observable} from 'mobx';

@observer
export default class AddressBuyView extends React.Component {
    @observable errMessage = undefined
    @observable addressIsValid = false

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