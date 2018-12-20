import React from 'react'
import { View, StyleSheet, SafeAreaView, Image } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import Input from '../../../components/Input/Input'
import SegmentedControl from '../../../components/SegmentedControl/SegmentedControl'
import withTitle from '../../../components/HOC/withTitle'
import Coin from "../Coin/Coin";
import { inject, observer } from 'mobx-react'

const InputWithTitle = withTitle(Input)
const SegmentedControlWithTitle = withTitle(SegmentedControl)

@inject(['wallet'])
@observer
export default class InputWalletInformationView extends React.Component {
    state = {
        progress: false,
        selectedIndex: 0,
        coin: {}
    }

    componentWillMount() {
        const coin = this.props.navigation.getParam('coin', {})
        this.setState({ coin })
    }

    render() {
        const { selectedIndex, coin } = this.state

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Coin name={coin.name} symbol={coin.symbol} themeColor={coin.themeColor} onPress={()=>{}} activate={true}/>
                        <InputWithTitle title={'지갑 이름'} />
                        {/*<InputWithTitle title={'지갑 설명'} />*/}
                        <InputWithTitle title={'비밀번호'}
                                        secureTextEntry={true} />
                        <InputWithTitle title={'비밀번호 재입력'}
                                        secureTextEntry={true} />
                        {/*<SegmentedControlWithTitle title={'공개범위 설정'}
                                                   options={['소유자 정보', '지갑 정보']}
                                                   selectedIndex={selectedIndex}
                                                   onChange={index => this.setState({ selectedIndex: index })} />*/}
                    </View>
                    <NavigationButton title={'생성하기'} onPress={this.createWallet} />
                </View>
            </SafeAreaView>
        )
    }

    createWallet = () => {
        this.setState({progress: true})
        const {coin} = this.state
        const name = ''
        const password = ''
        this.props.wallet.createWallet(coin.symbol, name, password).then(() => {
            this.setState({progress: false})
            this.props.navigation.navigate('Main')
        }).catch(e => {
            this.setState({progress: false})
            alert(`지갑 생성 실패 ${e}`)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 5,
    },
    icon: {
        width: 40,
        height: 40,
    }
})