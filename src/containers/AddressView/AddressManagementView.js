import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, FlatList} from 'react-native';
import {inject, observer} from "mobx-react/index";
import WalletCard from "../../components/Card/WalletCard";
import AddressCard from "../../components/Card/AddressCard";

@inject(['address'])
@observer
export default class AddressManagementView extends React.Component {

    static get options() {
        return {topBar: {title: {text: '주소 관리'}}}
    }

    static propTypes = {
        currentAddress: PropTypes.string.isRequired
    }

    render() {
        const addressItem = this.props.address.linkedAddressList.find(a => a.address === this.props.currentAddress)
        return (
            <View style={styles.container}>
                <AddressCard address={addressItem.address} linkedAddressCount={addressItem.accountAddressList.length} activate={true}/>
                <FlatList
                    style={styles.list}
                    data={addressItem.accountAddressList}
                    keyExtractor={(item) => item.address}
                    renderItem={({item}) => {
                        return (<WalletCard name={item.address} symbol={item.symbol} moneySymbol={'KRW'}/>)
                    }}
                />
            </View>
        )
    }

    onBack = () => {
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    },
    list: {
        flex: 1
    }
});