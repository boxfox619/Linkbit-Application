import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TextInput, Picker } from 'react-native'
import { observer } from 'mobx-react'
import { PRIMARY_COLOR } from "../../libs/Constraints";
import CardSummary from '../../components/CardSummary/CardSummary'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl'
import SearchBar from '../../components/SearchBar/SearchBar'
import AddressBox from '../../components/AddressBox/AddressBox'
import AddressInput from '../../components/AddressInput/AddressInput'
import AmountInput from '../../components/AmountInput/AmountInput'
import AmountBox from '../../components/AmountBox/AmountBox'
import RemittanceProcessStore from '../../store/RemittanceProcessStore'
import RemittanceType from '../../store/RemittanceType'

const remittanceProcessStore = new RemittanceProcessStore()

@observer
export default class RemmittanceView extends React.Component {
    componentDidMount() {
    }

    onMethodChange = index => {
        for (const key in RemittanceType) {
            if (RemittanceType[key] === index) {
                remittanceProcessStore.method = RemittanceType[key]
            }
        }

        remittanceProcessStore.step = 1
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>{'출금 지갑'}</Text>
                    <CardSummary />
                    <Text style={styles.title}>{'송금 방법'}</Text>
                    <SegmentedControl options={['친구', '지갑']}
                        selectedIndex={remittanceProcessStore.method}
                        onChange={this.onMethodChange} />
                    {
                        remittanceProcessStore.method === RemittanceType.Friend ?
                            <React.Fragment>
                                <Text style={styles.title}>{'친구 목록'}</Text>
                                <SearchBar />
                            </React.Fragment> :
                            null
                    }
                    {
                        remittanceProcessStore.method === RemittanceType.Wallet ?
                            <React.Fragment>
                                <Text style={styles.title}>{'지갑 주소'}</Text>
                                <AddressInput />
                            </React.Fragment> :
                            null
                    }
                    {
                        remittanceProcessStore.step >= 2 && remittanceProcessStore.method === RemittanceType.Friend ?
                            <React.Fragment>
                                <Text style={styles.title}>{'받는 분'}</Text>
                                <AddressBox address={'6abnbexlai13tbajfldxze'} />
                            </React.Fragment> :
                            null
                    }
                    {
                        remittanceProcessStore.step >= 2 && remittanceProcessStore.method === RemittanceType.Wallet ?
                            <React.Fragment>
                                <Text style={styles.title}>{'받는 주소'}</Text>
                                <AddressBox address={'6abnbexlai13tbajfldxze'} />
                            </React.Fragment> :
                            null
                    }
                    {
                        remittanceProcessStore.step >= 3 ?
                            <Text style={styles.title}>{'보낼 금액'}</Text> :
                            null
                    }
                    {
                        remittanceProcessStore.step === 3 ?
                            <AmountInput data={[['KRW', 'USD']]} /> :
                            null
                    }
                    {
                        remittanceProcessStore.step >= 4 ?
                            <AmountBox /> :
                            null
                    }
                </View>
                <NavigationButton title={'다음'}
                    onPress={() => remittanceProcessStore.step++} />
            </View>
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
        width: '100%',
        marginHorizontal: 'auto',
        marginTop: 20,
        marginBottom: 5
    },
})