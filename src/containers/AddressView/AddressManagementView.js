import React from 'react'
import { View, StyleSheet, SafeAreaView, FlatList, Alert, Button } from 'react-native'
import { inject, observer } from 'mobx-react/index'
import UnknownWallet from '../../store/Wallet/UnknwonWallet'
import WalletCard from '../../components/Card/WalletCard'
import AddressCard from '../../components/Card/AddressCard'
import { dollarFormat, fixed } from '../../libs/NumberFormatter'
import { PRIMARY_COLOR } from "../../libs/Constraints";
import i18n from '../../libs/Locale'
import withProgressDialog from '../../components/HOC/withProgressDialog';

@inject('address', 'wallet', 'coin')
@observer
class AddressManagementView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: i18n.t('edit_address'),
            headerTitleStyle: { color: 'black' },
            headerStyle: { backgroundColor: 'white' },
        }
    }

    render() {
        const walletList = Object.keys(this.currentAddressItem.accountAddressMap).map(symbol => {
            const account = this.currentAddressItem.getAccountAddress(symbol)
            const wallet = this.props.wallet.getWallet(account)
            if (wallet) {
                return wallet
            } else {
                return new UnknownWallet(symbol, account)
            }
        })
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <AddressCard address={this.currentAddressItem.linkaddress} linkedAddressCount={walletList.length} activate />
                    <FlatList
                        style={styles.list}
                        data={walletList}
                        extraData={{ size: walletList.length }}
                        keyExtractor={(item, idx) => (!!item) ? item.address : idx}
                        renderItem={({ item }) => {
                            const coin = this.props.coin.getCoin(item.symbol);
                            return item && (
                                <WalletCard
                                    key={item.address}
                                    onPress={() => this.handleWalletDelete(item)}
                                    themeColor={coin.themeColor}
                                    name={item.name}
                                    balance={item.balance}
                                    address={item.address}
                                    price={dollarFormat(fixed((item.balance * coin.price), 3))}
                                    symbol={item.symbol} moneySymbol="USD" />
                            )
                        }} />
                    <Button
                        title={i18n.t('link_wallet')}
                        color="#594343"
                        overrides={{ backgroundColor: '#594343' }}
                        onPress={() => this.onLinkNewWallet()} />
                </View>
            </SafeAreaView>
        )
    }

    get currentAddressItem() {
        const linkaddress = this.props.navigation.state.params.linkaddress
        return this.props.address.getLinkedAddress().find(a => a.linkaddress === linkaddress)
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
        this.props.showProgress(true)
        this.currentAddressItem.linkAddress(wallet.symbol, wallet.address).then(res => {
            this.props.showProgress(false)
            if (!res) {
                alert(i18n.t('fail_add_address'))
            }
        }).catch(e => {
            this.props.showProgress(false)
            alert(e)
        })
    }

    deleteWallet = (wallet) => {
        this.props.showProgress(true)
        this.currentAddressItem.unlinkAddress(wallet.symbol).then(res => {
            this.props.showProgress(false)
            if (!res) {
                alert(i18n.t('fail_delete_address'))
            }
        }).catch(e => {
            this.props.showProgress(false)
            alert(e)
        })
    }

    handleWalletDelete = (wallet) => {
        Alert.alert(
            i18n.t('delete_address'),
            i18n.t('confirm_delete_address'),
            [
                { text: i18n.t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: i18n.t('agree'), onPress: () => this.deleteWallet(wallet) },
            ],
            { cancelable: false },
        )
    }

    onBack = () => { }
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
export default withProgressDialog(AddressManagementView)