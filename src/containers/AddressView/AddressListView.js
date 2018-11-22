import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Header, Button} from 'react-native-elements';
import {HeaderButtonWithTitle} from "../../components/Header/HeaderButtonWithTitle";
import {inject, observer} from "mobx-react/index";
import AddressCard from "../../components/Card/AddressCard";

@inject(['address'])
@observer
export default class AddressListView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={'#ffffff'}
                    leftComponent={<HeaderButtonWithTitle icon='arrow-back' title='내 주소 관리'
                                                          onIconClicked={this.onBack}/>}
                    outerContainerStyles={{borderBottomWidth: 0, height: 60, marginTop: 10}}
                />
                <FlatList
                    style={styles.list}
                    keyExtractor={(item) => item.address}
                    data={this.props.address.linkedAddressList}
                    extraData={{size: this.props.address.linkedAddressList.length}}
                    renderItem={({item}) => {
                        return (
                            <AddressCard address={item.address} linkedAddressCount={item.accountAddressList.length}/>
                        )
                    }}
                />
                <Button title="Buy" onPress={this.onBuyAddress}/>
            </View>
        )
    }

    onBuyAddress = () => {

    }

    onBack = () => {
    }
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