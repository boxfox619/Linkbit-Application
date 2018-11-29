import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Button} from 'react-native-elements'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import {PRIMARY_COLOR} from "../../../libs/Constraints";

@observer
export default class AddressBuyFinishView extends React.Component {
    @observable address

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>Success Address Buy</Text>
                    <Text>Your Address : {this.address}</Text>
                </View>
                <Button title="finish"
                        onPress={this.onFinish}
                        buttonStyle={styles.getAddressButton}/>
            </View>
        )
    }

    onFinish = () => {
        const params = this.state.params || {}
        this.props.navigation.goBack(params.go_back_key)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    content: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    getAddressButton: {
        backgroundColor: PRIMARY_COLOR
    }
});