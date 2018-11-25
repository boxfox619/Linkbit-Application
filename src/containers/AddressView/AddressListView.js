import React from 'react'
import {View, StyleSheet, FlatList, Text} from 'react-native'
import {Button} from 'react-native-elements'
import {inject, observer} from "mobx-react/index"
import AddressCard from "../../components/Card/AddressCard"
import {Navigation} from 'react-native-navigation'
import {observable} from 'mobx'
import AddressManagementView from './AddressManagementView';

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
                <Button title="Buy" onPress={() => Navigation.push(this.props.componentId, {component: {name: 'AddressBuy'}})}/>
            </View>
        )
        }
    }
d
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        padding: 10,
        flex: 1
    }
});