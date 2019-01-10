import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Button} from 'react-native-elements'
import {observer} from 'mobx-react'
import {PRIMARY_COLOR} from '../../../libs/Constraints'

@observer
export default class AddressBuyFinishView extends React.Component {

    onFinish = () => {
        this.props.navigation.goBack(null)
    }

    render() {
        const address = this.props.navigation.state.params.address
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>Success Address Buy</Text>
                    <Text>
                        Your Address :
                        {address}
                    </Text>
                </View>
                <Button
                    title="finish"
                    onPress={this.onFinish}
                    buttonStyle={styles.getAddressButton}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    getAddressButton: {
        backgroundColor: PRIMARY_COLOR,
    },
})
