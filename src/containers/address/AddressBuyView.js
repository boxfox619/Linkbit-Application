import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { observer } from 'mobx-react'
import i18n from '../../libs/Locale'
import { InputWithTitle } from '../../components/Input/Input'
import NavigationButton from '../../components/Button/NavigationButton'
import AddressBuyStore from '../../store/Address/AddressBuyStore'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CommonStyle from '../../libs/CommonStyle'
import { withProgressDialog } from '../../components/HOC';
import { handleError } from '../../libs/ErrorHandler';

@observer
class AddressBuyView extends React.Component {
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
            this.props.showProgress(true)
            this.addressBuyStore.getNewAddress().then(res => {
                this.props.showProgress(false)
                this.props.navigation.replace('AddressBuyFinish', { address: this.addressBuyStore.linkaddress })
            }).catch(err => {
                handleError(err)
                this.props.showProgress(false, '', () => alert(err.message))
            })
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

export default withProgressDialog(AddressBuyView)
