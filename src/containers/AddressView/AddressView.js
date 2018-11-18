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
                    leftComponent={<HeaderButtonWithTitle icon='arrow-back' title='내 주소 관리' onIconClicked={this.onBack}/>}
                    outerContainerStyles={{borderBottomWidth: 0, height: 70}}
                />
                <FlatList
                    style={styles.list}
                    data={this.props.address.linkedAddressList}
                    extraData={{size: this.props.address.linkedAddressList.length}}
                    renderItem={({item})=> {
                        return (
                            <BorderCard key={item.address}>
                                <Text>{item.address}</Text>
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
    }
});