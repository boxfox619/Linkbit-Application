import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Button} from 'react-native-elements';
import {observer} from 'mobx-react'
import {observable} from 'mobx'

@observer
export default class AddressBuyFinishView extends React.Component {
    @observable address

    render() {
        return (
            <View style={styles.container}>
                <Text>Success Address Buy</Text>
                <Text>Your Address : {this.address}</Text>
                <Button title="finish" onPress={this.onFinish}/>
            </View>
        )
    }

    onFinish = () => {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});