import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text, View } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import SelectCoinView from '../SelectCoinView/SelectCoinView'
import {inject, observer} from "mobx-react/index";

@inject(['coin'])
@observer
export default class SelectedWalletView extends React.Component {
    state = {
        selectedIndex: -1,
    }

    render() {
        const {coinList} = this.props.coins
        const { selectedIndex } = this.state
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <SelectCoinView coins={coinList}
                        selectedIndex={selectedIndex}
                        updateSelectedIndex={async (index) => await this.setState({ selectedIndex: index })}/>
                    <NavigationButton title={'다음'}
                        onPress={this.navigateToNext} />
                </View>
            </SafeAreaView>
        )
    }

    navigateToNext = () => {
        const coin = coins[this.state.selectedIndex]

        if (coin.subCoins) {
            this.props.navigation.navigate('SelectWalletDetail', { coin: coin })
        } else {
            this.props.navigation.navigate('InputWalletDetail', { coin: coin })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})