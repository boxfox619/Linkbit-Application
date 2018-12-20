import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text, View } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import SelectCoinView from '../SelectCoinView/SelectCoinView'
import {observer} from "mobx-react/index";
import CoinStore from "../../../store/Coin/CoinStore";

@observer
export default class SelectedWalletView extends React.Component {
    state = {
        selectedCoin: undefined,
    }
    componentWillMount() {
        this.coinStore = new CoinStore()
        this.coinStore.fetchCoins()
    }

    render() {
        const {coinList} = this.coinStore
        const { selectedCoin } = this.state
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <SelectCoinView
                        style={styles.coinList}
                        coins={coinList}
                        isLoading={this.coinStore.isLoading}
                        selectedCoin={selectedCoin}
                        onSelectCoin={(symbol) => this.setState({ selectedCoin: symbol })}/>
                    <NavigationButton title={'다음'}
                        onPress={this.navigateToNext} />
                </View>
            </SafeAreaView>
        )
    }

    navigateToNext = () => {
        const {coinList} = this.coinStore
        const {selectedCoin} = this.state

        /*if (coin.subCoins) {
            this.props.navigation.navigate('SelectWalletDetail', { coin: coin })
        }*/
        this.props.navigation.navigate('InputWalletDetail', {coin: coinList.find(c => c.symbol === selectedCoin)})
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    coinList: {
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})