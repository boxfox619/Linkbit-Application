import React from 'react'
import PropTypes from 'prop-types'
import NavigationButton from '../../../components/NavigationButton/NavigationButton'
import CommonStyle from '../../../libs/CommonStyle'
import { PRIMARY_COLOR } from '../../../libs/Constraints'
import { View, StyleSheet, Image, Text, SafeAreaView } from 'react-native'

export default class InvoiceView extends React.Component {
    static propTypes = {
        // symbol: PropTypes.string.isRequired,
        // moneySymbol: PropTypes.string.isRequired,
        // amount: PropTypes.any.isRequired,
        // price: PropTypes.any.isRequired,
        // withDrawWalletName: PropTypes.string.isRequired,
        // balance: PropTypes.number.isRequired,
        // destAddress: PropTypes.string.isRequired
    }

    render() {
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
                                    <Text>{'해당 주소로\n'}</Text>
                                    <Text style={{ fontWeight: "bold" }}>{'ETH 35.315 '}</Text>
                                    <Text>{'송금 완료!'}</Text>
                                </Text>
                                <Text style={styles.destAddress}>{'받는 주소 6xbnbexlai13tbajfldxze'}</Text>
                                <View style={styles.description}>
                                    <Text style={styles.key}>{'출금 지갑'}</Text>
                                    <Text style={styles.value}>{'나의 이더리움 지갑1'}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.description}>
                                    <Text style={styles.key}>{'송금 후 잔액'}</Text>
                                    <Text style={styles.value}>{'99.848 ETH'}</Text>
                                </View>
                            </View>
                        </View>
                        <NavigationButton title={'확인'} onPress={() => { }} />
                    </View>
                </SafeAreaView>
            </React.Fragment >
        )
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