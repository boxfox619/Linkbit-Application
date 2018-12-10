import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text, View } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import Coin from '../Coin/Coin'

export default class SelectedWalletDetailView extends React.Component {
    state = {
        selectedIndex: -1,
        isRefresh: false,
    }

    render() {
        const { selectedIndex, isRefresh } = this.state
        const coins = this.props.navigation.getParam('coins', [])

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <FlatList
                        style={styles.list}
                        data={coins}
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
        this.props.navigation.navigate('InputWalletDetail')
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