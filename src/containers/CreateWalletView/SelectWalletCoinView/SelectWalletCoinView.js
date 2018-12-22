import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text, View } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import { observer } from "mobx-react/index";
import CoinStore from "../../../store/Coin/CoinStore";
import SelectCoinView from "../../../components/List/SelectCoinView";

@observer
export default class SelectWalletCoinView extends React.Component {
    state = {
        selectedCoin: undefined,
    }
    componentWillMount() {
        this.coinStore = new CoinStore()
        this.coinStore.fetchCoins()
    }

    render() {
        const { coinList } = this.coinStore
        const { selectedCoin } = this.state
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <SelectCoinView
                        style={styles.coinList}
                        coins={coinList}
                        isLoading={this.coinStore.isLoading}
                        selectedCoin={selectedCoin}
                        onSelectCoin={(symbol) => this.setState({ selectedCoin: symbol })} />
                    <NavigationButton title={'다음'}
                        onPress={this.navigateToNext} />
                </View>
            </SafeAreaView>
        )
    }

    navigateToNext = () => {
        const { coinList } = this.coinStore
        const { selectedCoin } = this.state

        const coin = coinList.find(c => c.symbol === selectedCoin)

        if (!coin) {
            alert('생성할 코인을 선택해주세요')
            return
        }

        if (coin.subCoins) {
            this.props.navigation.navigate('CreateWallet.SelectWalletToken', { coin })
        } else {
            this.props.navigation.navigate('CreateWallet.EnterWalletDetail', { coin })
        }

    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    coinList: {
        height: '100%',
        paddingBottom: 50,
        paddingHorizontal: 10
    }
})