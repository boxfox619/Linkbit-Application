import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { observer } from 'mobx-react'
import { PRIMARY_COLOR } from '../../../libs/Constraints'
import AddressBuyStore from '../../../store/Address/AddressBuyStore'
import CommonStyle from '../../../libs/CommonStyle'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'

@observer
export default class AddressBuyView extends React.Component {

    constructor(props) {
        super(props)
        this.addressBuyStore = new AddressBuyStore()
    }

    static get options() {
        return { topBar: { title: { text: '주소 구매' } } }
    }

    onNext = () => {
        if (!this.addressBuyStore.valid) {
            this.addressBuyStore.getNewAddress().then(res => {
                this.props.navigation.navigate('AddressBuyFinish', { address: this.addressBuyStore.linkAddress })
            }).catch(err => alert(err))
        }
        else {
            alert("올바른 주소를 입력해주세요")
        }
    }

    addressValidCheck = (text) => {
        this.addressBuyStore.setAddress(text)
    }

    render() {
        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
                    <View style={styles.container}>
                        <View style={styles.form}>
                            <FormLabel>Address</FormLabel>
                            <FormInput onChangeText={this.addressValidCheck} />
                            {this.addressBuyStore.error &&
                                <FormValidationMessage>{this.addressBuyStore.error}</FormValidationMessage>
                            }
                        </View>
                        <NavigationButton
                            title="다음"
                            onPress={this.onNext} />
                    </View>
                </SafeAreaView>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    form: {
        flex: 1,
    },
    getAddressButton: {
        backgroundColor: PRIMARY_COLOR,
    },
})
