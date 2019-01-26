import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import { observer } from "mobx-react/index";
import CoinStore from "../../../store/Coin/CoinStore";
import SelectCoinView from "../../../components/List/SelectCoinView"
import { PRIMARY_COLOR } from '../../../libs/Constraints'
import CommonStyle from '../../../libs/CommonStyle'

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
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
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
            </React.Fragment>
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
        /*if (coin.subCoins) {
            this.props.navigation.navigate('CreateWallet.SelectWalletToken', { coin })
        } else {
            this.props.navigation.navigate('CreateWallet.EnterWalletDetail', { coin })
        }*/
        this.props.navigation.navigate('CreateWallet.EnterWalletDetail', { coin })

    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    coinList: {
        height: '100%',
        paddingBottom: 50,
        paddingHorizontal: 10
    }
})