import React from 'react'
import {View, StyleSheet, FlatList, Alert, Button} from 'react-native'
import {inject, observer} from 'mobx-react/index'
import WalletCard from '../../components/Card/WalletCard'
import AddressCard from '../../components/Card/AddressCard'
import {PRIMARY_COLOR} from "../../libs/Constraints";

@inject('address', 'wallet')
@observer
export default class AddressManagementView extends React.Component {

    static get options() {
        return {topBar: {title: {text: '주소 관리'}}}
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
                    title="Link new wallet"
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
                alert('주소 추가에 실패했습니다')
            }
        }).catch(e => alert(e))
    }

    deleteWallet = (wallet) => {
        this.currentAddressItem.deleteAddress(wallet.symbol).then(res => {
            if(!res){
                alert('주소 삭제에 실패했습니다')
            }
        }).catch(e => alert(e))
    }

    handleWalletDelete = (wallet) => {
        Alert.alert(
            '지갑 삭제',
            '연결된 지갑을 삭제하시겠습니까?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.deleteWallet(wallet)},
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
