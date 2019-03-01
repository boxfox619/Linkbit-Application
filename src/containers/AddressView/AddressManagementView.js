import React from 'react'
import {View, StyleSheet, FlatList, Alert, Button} from 'react-native'
import {inject, observer} from 'mobx-react/index'
import WalletCard from '../../components/Card/WalletCard'
import AddressCard from '../../components/Card/AddressCard'
import {PRIMARY_COLOR} from "../../libs/Constraints";
import i18n from '../../libs/Locale'

@inject('address', 'wallet')
@observer
export default class AddressManagementView extends React.Component {

    static get options() {
        return {topBar: {title: {text: i18n.t('edit_address')}}}
    }

    render() {
        const addressList = this.currentAddressItem.accountAddressList.map(address => this.props.wallet.getWallet(address))
        return (
            <View style={styles.container}>
                <AddressCard address={this.currentAddressItem.linkAddress}
                             linkedAddressCount={addressList.length} activate/>
                <FlatList
                    style={styles.list}
                    data={addressList}
                    extraData={{size: addressList.length}}
                    keyExtractor={(item, idx) => (!!item) ? item.address : idx}
                    renderItem={({item}) => {
                        return item && (<WalletCard
                                key={item.address}
                                onPress={() => this.handleWalletDelete(item)}
                                name={item.name}
                                symbol={item.symbol} moneySymbol="USD"/>
                        )
                    }}/>

                <Button
                    title={i18n('link_wallet')}
                    color="#594343"
                    overrides={{backgroundColor: '#594343'}}
                    onPress={() => this.onLinkNewWallet()}/>
            </View>
        )
    }

    get currentAddressItem() {
        const linkAddress = this.props.navigation.state.params.linkAddress
        return this.props.address.getLinkedAddress().find(a => a.linkAddress === linkAddress)
    }

    onLinkNewWallet = () => {
        this.props.navigation.navigate({
            routeName: 'WalletSearch',
            params: {
                excludeSymbolList: this.currentAddressItem.symbols,
                onWalletSelected: this.addWallet,
            },
        })
    }

    addWallet = (wallet) => {
        this.currentAddressItem.addAddress(wallet.symbol, wallet.address).then(res => {
            if(!res){
                alert(i18n('fail_add_address'))
            }
        }).catch(e => alert(e))
    }

    deleteWallet = (wallet) => {
        this.currentAddressItem.deleteAddress(wallet.symbol).then(res => {
            if(!res){
                alert(i18n('fail_delete_address'))
            }
        }).catch(e => alert(e))
    }

    handleWalletDelete = (wallet) => {
        Alert.alert(
            i18n('delete_address'),
            i18n('confirm_delete_address'),
            [
                {text: i18n('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: i18n('agree'), onPress: () => this.deleteWallet(wallet)},
            ],
            {cancelable: false},
        )
    }

    onBack = () => {
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    list: {
        flex: 1,
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
    },
})
