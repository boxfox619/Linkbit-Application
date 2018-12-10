import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text, View } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import Coin from '../Coin/Coin'

export default class SelectedWalletView extends React.Component {
    state = {
        selectedIndex: -1,
        isRefresh: false,
        data: [{
            icon: {},
            name: '비트코인',
            symbol: 'BTC'
        },
        {
            icon: {},
            name: '비트코인',
            symbol: 'BTC'
        },
        {
            icon: {},
            name: '비트코인',
            symbol: 'BTC'
        },
        {
            icon: {},
            name: '비트코인',
            symbol: 'BTC'
        },
        {
            icon: {},
            name: '비트코인',
            symbol: 'BTC'
        },]
    }

    render() {
        const { selectedIndex, isRefresh } = this.state
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <FlatList
                        style={styles.list}
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={isRefresh}
                        onRefresh={() => { }}
                        renderItem={({ item, index }) => (
                            <Coin name={item.name}
                                symbol={item.symbol}
                                themeColor={'#007aff'}
                                isHighlighted={selectedIndex === index}
                                updateSelectedIndex={async () => await this.setState({ selectedIndex: index })} />
                        )} />
                    {/* Check sub coin is exist */}
                    <NavigationButton title={'다음'}
                        onPress={() => this.props.navigation.navigate('InputWalletDetail')} />
                </View>
            </SafeAreaView>
        )
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