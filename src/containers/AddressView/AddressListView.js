import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import {Button} from 'react-native-elements'
import {inject, observer} from "mobx-react/index"
import AddressCard from "../../components/Card/AddressCard"
import {observable} from 'mobx'
import AddressManagementView from './AddressManagementView';
import {PRIMARY_COLOR} from "../../libs/Constraints";

@inject(['address'])
@observer
export default class AddressListView extends React.Component {
    @observable selectedAddress =  undefined
    constructor(props){
        super(props)
    }

    static get options() {
        return {topBar: {title: {text: '주소 목록'}}}
    }

    render() {
        if(!!this.selectedAddress){
            return (<AddressManagementView currentAddress={this.selectedAddress }/>)
        }else{
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    keyExtractor={(item) => item.address}
                    data={this.props.address.linkedAddressList}
                    extraData={{size: this.props.address.linkedAddressList.length}}
                    renderItem={({item}) => {
                        return (
                            <AddressCard address={item.address}
                                         linkedAddressCount={item.accountAddressList.length}
                                         onPress={() => this.selectedAddress = item.address}/>
                        )
                    }}
                />
                <Button title="Get New Address"
                        buttonStyle={styles.getAddressButton}
                        onPress={() => this.props.navigation.navigate('AddressBuy')}/>
            </View>
        )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        paddingBottom: 20
    },
    list: {
        padding: 10,
        flex: 1
    },
    getAddressButton: {
        backgroundColor: PRIMARY_COLOR
    }

});