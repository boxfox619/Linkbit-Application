import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { observer } from 'mobx-react'
import i18n from '../../../libs/Locale'
import { InputWithTitle } from '../../../components/Input/Input'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import AddressBuyStore from '../../../store/Address/AddressBuyStore'
import { PRIMARY_COLOR } from '../../../libs/Constraints'
import CommonStyle from '../../../libs/CommonStyle'

@observer
export default class AddressBuyView extends React.Component {
    static navigationOptions = () => {
        return {
            title: i18n.t('gettingAddress'),
            headerTitleStyle: { color: 'black' },
            headerStyle: { backgroundColor: 'white' },
        }
    }

    constructor(props) {
        super(props)
        this.addressBuyStore = new AddressBuyStore()
    }

    static get options() {
        return { topBar: { title: { text: i18n.t('purchase_address') } } }
    }

    onNext = () => {
        if (!this.addressBuyStore.valid) {
            this.addressBuyStore.getNewAddress().then(res => {
                this.props.navigation.replace('AddressBuyFinish', { address: this.addressBuyStore.linkAddress })
            }).catch(err => alert(err))
        } else {
            alert(i18n.t('err_addr'))
        }
    }

    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
                    <View style={styles.container}>
                        <View style={styles.form}>
                            <InputWithTitle title={i18n.t('address_lower')}
                                onChangeText={this.addressBuyStore.setAddress}
                                error={this.addressBuyStore.error} />
                        </View>
                        <NavigationButton title={i18n.t('next')} onPress={this.onNext} />
                    </View>
                </SafeAreaView>
            </>
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
        paddingHorizontal: 20
    }
})
