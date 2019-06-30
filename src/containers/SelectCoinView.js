import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { observer } from 'mobx-react'
import { COIN_INFO } from '../libs/Constraints'
import NavigationButton from '../components/Button/NavigationButton'
import { SelectCoinListView } from "../components/List"
import { PRIMARY_COLOR } from '../libs/Constraints'
import CommonStyle from '../libs/CommonStyle'
import i18n from '../libs/Locale'

@observer
export default class SelectCoinView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Select coin to create',
            headerTitleStyle: { color: 'black' },
            headerStyle: { backgroundColor: 'white' },
        }
    }

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
                        <NavigationButton title={i18n.t('next')}
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
            alert(i18n.t('select_coin'))
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
