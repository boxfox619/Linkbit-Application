import React from 'react'
import { fixed } from '../../../libs/NumberFormatter'
import NavigationButton from '../../../components/Button/NavigationButton'
import CommonStyle from '../../../libs/CommonStyle'
import { PRIMARY_COLOR } from '../../../libs/Constraints'
import { View, StyleSheet, Image, Text, SafeAreaView } from 'react-native'
import i18n from '../../../libs/Locale';

export default class InvoiceView extends React.Component {
    render() {
        const { symbol, amount, destAddress, withDrawWalletName, balance } = this.props.navigation.state.params

        const formattedAmount = fixed(amount, 3)
        const formattedBalance = fixed(balance, 3)

        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={[CommonStyle.safeArea, { backgroundColor: PRIMARY_COLOR }]}>
                    <View style={styles.container}>
                        <View style={{ padding: 20 }}>
                            <View style={styles.cardContainer}>
                                <View style={styles.iconContainer}>
                                    <View style={styles.iconBackground}>
                                        <Image style={styles.icon} resizeMode={'contain'} />
                                    </View>
                                </View>
                                <Text style={styles.name}>
                                    {/* <Text>{'해당 주소로\n'}</Text> */}
                                    <Text style={{ fontWeight: "bold" }}>{`${symbol} ${formattedAmount} `}</Text>
                                    <Text>{i18n.t('finish_withdraw')}</Text>
                                </Text>
                                <Text style={styles.destAddress}>{`${i18n.t('target_address')} ${destAddress}`}</Text>
                                <View style={styles.description}>
                                    <Text style={styles.key}>{i18n.t('withdraw_source_wallet')}</Text>
                                    <Text style={styles.value}>{`${withDrawWalletName}`}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.description}>
                                    <Text style={styles.key}>{i18n.t('balance_after_wallet')}</Text>
                                    <Text style={styles.value}>{`${symbol} ${formattedBalance}`}</Text>
                                </View>
                            </View>
                        </View>
                        <NavigationButton title={i18n.t('done')} onPress={this.goToMain} />
                    </View>
                </SafeAreaView>
            </React.Fragment>
        )
    }

    goToMain = () => {
        this.props.navigation.navigate('Main')
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    cardContainer: {
        position: 'relative',
        width: '100%',
        height: 306,
        borderRadius: 6,
        padding: 20,
        backgroundColor: '#627eea',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        width: '100%',
        marginTop: 20,
        marginLeft: 20,
        top: 0,
    },
    iconBackground: {
        width: 32,
        height: 32,
        backgroundColor: 'white',
        borderRadius: 16,
        position: 'relative'
    },
    destAddress: {
        color: '#eeeeee',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 32,
    },
    icon: {
        width: 26,
        height: 26,
        margin: 3,
    },
    name: {
        color: 'white',
        fontSize: 24,
    },
    description: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    key: {
        color: 'white',
        fontSize: 16,
    },
    value: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    divider: {
        backgroundColor: 'white',
        height: 1,
        width: '100%',
        marginTop: 16,
        marginBottom: 16
    }
})