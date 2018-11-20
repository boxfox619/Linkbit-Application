import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TextInput, Picker } from 'react-native';
import { PRIMARY_COLOR } from "../../libs/Constraints";
import CardSummary from '../../components/CardSummary/CardSummary'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import DropdownMenu from 'react-native-dropdown-menu'

export default class RemmittanceView extends React.Component {
    render() {
        const data = [["KRW", "USD"]]
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.title}>{'출금 지갑'}</Text>
                    <CardSummary />
                    <Text style={styles.title}>{'송금 방법'}</Text>
                    <View style={styles.optionContainer}>
                        <View style={[styles.option, styles.selected]}>
                            <Text style={[styles.optionName, styles.selectedText]}>지갑</Text>
                        </View>
                        <View style={styles.option}>
                            <Text style={styles.optionName}>친구</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>{'지갑 주소'}</Text>
                    <View style={styles.searchBar}>
                        <Image style={styles.searchBarIcon} />
                        <View style={styles.divider} />
                        <TextInput style={styles.searchBarInput} />
                    </View>
                    <Text style={styles.title}>{'보낼 금액'}</Text>
                    <View style={styles.amountContainer}>
                        <TextInput style={styles.unitInput} />
                        <View style={styles.unitPicker}>
                            <DropdownMenu
                                bgColor={'transparent'}
                                tintColor={'#594343'}
                                activityTintColor={'#594343'}
                                // arrowImg={}      
                                // checkImage={}   
                                optionTextStyle={{ color: '#594343' }}
                                titleStyle={{ color: '#594343' }}
                                // maxHeight={300} 
                                handler={(selection, row) => this.setState({ text: data[selection][row] })}
                                data={data} />
                        </View>
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
        paddingHorizontal: 20
    },
    title: {
        color: '#594343',
        fontSize: 14,
        fontWeight: 'bold',
        width: 316,
        marginHorizontal: 'auto'
    },
    optionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    option: {
        borderColor: '#594343',
        borderRadius: 5,
        borderWidth: 3,
        height: 53,
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionName: {
        color: '#594343',
        textAlign: 'center',
        fontSize: 14,
    },
    selected: {
        borderColor: '#594343',
        backgroundColor: '#594343',
    },
    selectedText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#594343',
        borderRadius: 5,
        borderWidth: 3,
        height: 53,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: 1,
        height: 25,
        backgroundColor: '#EAEAEA',
    },
    searchBarIcon: {
        width: 47,
        height: 47,
    },
    searchBarInput: {
        height: 47,
        fontSize: 14,
        lineHeight: 14,
        flexGrow: 1,
        marginHorizontal: 6
    },
    amountContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    unitInput:{
        height: 53,
        flexGrow: 1,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#594343'
    },
    unitPicker: {
        height: 53,
        width: 100,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#594343'
    }
});