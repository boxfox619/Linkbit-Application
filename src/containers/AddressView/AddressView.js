import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Header} from 'react-native-elements';
import {HeaderButtonWithTitle} from "../../components/Header/HeaderButtonWithTitle";
import BorderCard from "../../components/Card/BorderCard";
import {inject, observer} from "mobx-react/index";

@inject(['address'])
@observer
export default class AddressView extends React.Component {

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
                            <BorderCard>
                                <Text>{item.address}</Text>
                                {item.accountAddressList.length > 0 &&
                                <Text style={[styles.connectState, styles.connected]}>
                                    {item.accountAddressList.length} connected
                                </Text>
                                }
                                {item.accountAddressList.length == 0 &&
                                    <Text style={styles.connectState}>nothing connected</Text>
                                }
                            </BorderCard>
                        )
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
        flex: 1
    },
    list: {
        padding: 10,
        flex: 1
    },
    connectState: {
        textAlign: 'right',
        color: 'black'
    },
    connected: {
        color: 'green'
    }
});