import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TextInput, Picker } from 'react-native';
import { PRIMARY_COLOR } from "../../libs/Constraints";
import CardSummary from '../../components/CardSummary/CardSummary'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl'
import SearchBar from '../../components/SearchBar/SearchBar'
import AddressBox from '../../components/AddressBox/AddressBox'
import AddressInput from '../../components/AddressInput/AddressInput'
import AmountInput from '../../components/AmountInput/AmountInput'
import AmountBox from '../../components/AmountBox/AmountBox'
 
export default class RemmittanceView extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>{'출금 지갑'}</Text>
                        <CardSummary />
                        <Text style={styles.title}>{'송금 방법'}</Text>
                        <SegmentedControl options={['지갑', '친구']} />
                        <Text style={styles.title}>{'친구 목록'}</Text>
                        <SearchBar />
                        <Text style={styles.title}>{'지갑 주소'}</Text>
                        <AddressInput />
                        <Text style={styles.title}>{'받는 주소'}</Text>
                        <AddressBox address={'6abnbexlai13tbajfldxze'} />
                        <Text style={styles.title}>{'보낼 금액'}</Text>
                        <AmountInput data={[['KRW', 'USD']]} />
                        <AmountBox />
                    </View>
                    <NavigationButton title={'다음'} />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    wrapper: {
        paddingHorizontal: 20
    },
    title: {
        color: '#594343',
        fontSize: 14,
        fontWeight: 'bold',
        width: 316,
        marginHorizontal: 'auto'
    },
})