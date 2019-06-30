import React from 'react'
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native'
import { observer } from 'mobx-react'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CommonStyle from '../../libs/CommonStyle'
import NavigationButton from '../../components/Button/NavigationButton'
import i18n from '../../libs/Locale'
import checkedIcon from '../../assets/checked.png'

@observer
export default class AddressBuyFinishView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: i18n.t('finish'),
            headerTitleStyle: { color: 'black' },
            headerStyle: { backgroundColor: 'white' },
            headerLeft: null
        }
    }

    onFinish = () => {
        this.props.navigation.goBack(null)
    }

    render() {
        const address = this.props.navigation.state.params.address

        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <Image style={styles.image}
                                source={checkedIcon} />
                            <Text style={styles.title}>{i18n.t('success_add')}</Text>
                            <Text style={styles.subTitle}>{address}</Text>
                        </View>
                        <NavigationButton
                            title={i18n.t('done')}
                            onPress={this.onFinish} />
                    </View>
                </SafeAreaView>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    getAddressButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        marginTop: 20,
        color: 'black',
        fontSize: 20
    },
    subTitle: {
        color: PRIMARY_COLOR,
        fontSize: 20,
        fontWeight: 'bold',
    }
})
