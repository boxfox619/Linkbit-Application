import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import {SearchBar} from 'react-native-elements'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import WalletCard from "../../components/Card/WalletCard";

@inject(['wallet'])
@observer
export default class WalletSearchView extends React.Component {
    @observable wallets

    render() {
        const {onWalletSelected} = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <SearchBar
                    round
                    lightTheme
                    onChangeText={this.onChangeText}
                    onClearText={this.onChangeText}
                    placeholder='Wallet name or address...'/>
                <FlatList
                    style={styles.list}
                    data={this.wallets}
                    keyExtractor={(item) => item.address}
                    renderItem={({item}) => {
                        return (<WalletCard name={item.address}
                                            symbol={item.symbol}
                                            moneySymbol={'KRW'}
                                            onPress={() => onWalletSelected(item)}/>)
                    }}
                />
            </View>
        )
    }

    componentDidMount() {
        this.onChangeText()
    }

    onChangeText = (text) => {
        let excludeAddressList = this.props.navigation.state.params.excludeAddressList || []
        excludeAddressList = excludeAddressList.map(item => item.address)
        if (!text || text.length === 0) {
            this.wallets = this.props.wallet.wallets.filter(w => excludeAddressList.indexOf(w.accountAddress) === -1)
        } else {
            text = text.toLowerCase()
            this.wallets = this.props.wallet.wallets.filter(w => {
                return (
                    w.address.toLowerCase().indexOf(text) > -1
                    || w.linkedAddress.toLowerCase().indexOf(text) > -1
                    || w.name.toLowerCase().indexOf(text) > -1
                )
            }).filter(w => excludeAddressList.indexOf(w.accountAddress) > -1)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flex: 1,
        padding: 10
    }
})
