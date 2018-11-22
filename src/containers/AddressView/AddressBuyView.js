import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {observer} from 'mobx-react';
import {observable} from 'mobx';

@observer
export default class AddressBuyView extends React.Component {
    @observable errMessage = undefined

    render() {
        return (
            <View styles={styles.container}>
                <FormLabel>Address</FormLabel>
                <FormInput onChangeText={this.addressValidCheck}/>
                {this.errMessage &&
                <FormValidationMessage>{this.errMessage}</FormValidationMessage>
                }
            </View>
        )
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