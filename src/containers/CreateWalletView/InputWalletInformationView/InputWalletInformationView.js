import React from 'react'
import { View, StyleSheet, SafeAreaView, Image } from 'react-native'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import Input from '../../../components/Input/Input'
import SegmentedControl from '../../../components/SegmentedControl/SegmentedControl'
import withTitle from '../../../components/HOC/withTitle'

const InputWithTitle = withTitle(Input)
const SegmentedControlWithTitle = withTitle(SegmentedControl)

export default class InputWalletInformationView extends React.Component {
    state = {
        selectedIndex: 0
    }

    render() {
        const { themeColor, icon } = this.props
        const { selectedIndex } = this.state

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <View style={styles.card}>
                            <Image style={styles.icon}
                                source={icon} />
                        </View>
                        <InputWithTitle title={'지갑 이름'} />
                        <InputWithTitle title={'지갑 설명'} />
                        <InputWithTitle title={'비밀번호'}
                            secureTextEntry={true} />
                        <InputWithTitle title={'비밀번호 재입력'}
                            secureTextEntry={true} />
                        <SegmentedControlWithTitle title={'공개범위 설정'}
                            options={['소유자 정보', '지갑 정보']}
                            selectedIndex={selectedIndex}
                            onChange={index => this.setState({ selectedIndex: index })} />
                    </View>
                    <NavigationButton title={'다음'} />
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
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 5,
        backgroundColor: '#007aff'
    },
    icon: {
        width: 40,
        height: 40,
        backgroundColor: 'white'
    }
})