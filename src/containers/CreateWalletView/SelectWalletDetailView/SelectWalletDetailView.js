import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text, View } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import SelectCoinView from '../SelectCoinView/SelectCoinView'
import Coin from '../Coin/Coin'

export default class SelectedWalletDetailView extends React.Component {
    state = {
        selectedIndex: -1,
        coin: {}
    }

    componentDidMount() {
        const coin = this.props.navigation.getParam('coin', {})
        this.setState({ coin })
    }

    render() {
        const { selectedIndex, coin } = this.state

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <SelectCoinView coins={coin.subCoins}
                        selectedIndex={selectedIndex}
                        updateSelectedIndex={async (index) => await this.setState({ selectedIndex: index })} />
                    <NavigationButton title={'다음'}
                        onPress={this.navigateToNext} />
                </View>
            </SafeAreaView>
        )
    }

    navigateToNext = () => {
        this.props.navigation.navigate('InputWalletDetail', { coin: this.state.coin })
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    list: {
        paddingHorizontal: 20,
    }
})