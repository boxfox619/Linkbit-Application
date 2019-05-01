import React from 'react'
import { COIN_INFO } from '../../libs/Constraints'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { observer } from 'mobx-react/index'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import SelectCoinListView from "../../components/List/SelectCoinListView"
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CommonStyle from '../../libs/CommonStyle'

@observer
export default class SelectCoinView extends React.Component {
    state = {
        selectedCoin: undefined,
    }

    render() {
        const { selectedCoin } = this.state
        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
                    <View style={styles.container}>
                        <SelectCoinListView
                            style={styles.coinList}
                            coins={COIN_INFO}
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
        const { selectedCoin } = this.state
        const { nextPath } = this.props.navigation.state.params
        const coin = COIN_INFO.find(c => c.symbol === selectedCoin)
        if (!coin) {
            alert('코인을 선택해주세요')
            return
        }
        this.props.navigation.navigate(nextPath, { coin })

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