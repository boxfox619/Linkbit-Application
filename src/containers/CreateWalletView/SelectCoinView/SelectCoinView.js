import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Coin from '../Coin/Coin'

export default class SelectCoinView extends React.Component {
    state = {
        isRefresh: false,
    }

    render() {
        const { isRefresh } = this.state
        const { coins, selectedIndex, updateSelectedIndex } = this.props
        return (
            <FlatList
                contentContainerStyle={styles.list}
                data={coins}
                keyExtractor={(item, index) => item.symbol}
                refreshing={isRefresh}
                onRefresh={() => { }}
                renderItem={({ item, index }) => (
                    <Coin name={item.name}
                        symbol={item.symbol}
                        icon={item.icon}
                        themeColor={item.themeColor}
                        isHighlighted={selectedIndex === index}
                        updateSelectedIndex={() => updateSelectedIndex(index)} />
                )} />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
    }
})