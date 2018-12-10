import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text, View } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import Coin from '../Coin/Coin'

export default class SelectedWalletDetailView extends React.Component {
    state = {
        selectedIndex: -1,
        isRefresh: false,
        coin: {}
    }

    componentDidMount() {
        const coin = this.props.navigation.getParam('coin', {})
        this.setState({ coin })
    }

    render() {
        const { selectedIndex, isRefresh, coin } = this.state

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <FlatList
                        style={styles.list}
                        data={coin.subCoins}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={isRefresh}
                        onRefresh={() => { }}
                        renderItem={({ item, index }) => (
                            <Coin name={item.name}
                                symbol={item.symbol}
                                themeColor={item.themeColor}
                                isHighlighted={selectedIndex === index}
                                updateSelectedIndex={async () => await this.setState({ selectedIndex: index })} />
                        )} />
                    {/* Check sub coin is exist */}
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