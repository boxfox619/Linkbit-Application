import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import SelectCoinView from '../SelectCoinView/SelectCoinView'

export default class SelectedWalletDetailView extends React.Component {
    state = {
        selectedCoinSymbol: undefined,
        parentCoin: undefined,
    }

    componentDidMount() {
        const parentCoin = this.props.navigation.getParam('coin', {})
        this.setState({ parentCoin })
    }

    render() {
        const { selectedCoinSymbol, parentCoin } = this.state
        const coins = parentCoin ? parentCoin.subCoins : undefined

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <SelectCoinView coins={coins}
                        style={styles.list}
                        selectedCoin={selectedCoinSymbol}
                        onSelectCoin={symbol => this.setState({ selectedCoinSymbol: symbol })}/>
                    <NavigationButton title={'다음'}
                        onPress={this.navigateToNext} />
                </View>
            </SafeAreaView>
        )
    }

    navigateToNext = () => {
        const { parentCoin, selectedCoinSymbol } = this.state
        const selectedCoin = parentCoin.subCoins.find(coin => coin.symbol === selectedCoinSymbol)

        if(!selectedCoin){
            alert("생성할 코인을 선택해주세요")
            return
        }

        this.props.navigation.navigate('InputWalletDetail', { coin: selectedCoin })
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    list: {
        height: '100%',
        paddingBottom: 50,
        paddingHorizontal: 10
    }
})