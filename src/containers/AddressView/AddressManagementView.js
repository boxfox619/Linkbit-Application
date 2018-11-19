import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, FlatList} from 'react-native';
import {Header} from 'react-native-elements';
import {HeaderButtonWithTitle} from "../../components/Header/HeaderButtonWithTitle";
import {inject, observer} from "mobx-react/index";
import BorderCard from "../../components/Card/BorderCard";
import WalletCard from "../../components/Card/WalletCard";

@inject(['address'])
@observer
export default class AddressManagementView extends React.Component {

    static propTypes = {
        currentAddress: PropTypes.string.isRequired
    }

    render() {
        const addressItem = this.props.address.linkedAddressList.find(a => a.address === this.props.currentAddress)
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={'#ffffff'}
                    leftComponent={<HeaderButtonWithTitle icon='arrow-back' title='주소 연결 관리'
                                                          onIconClicked={this.onBack}/>}
                    outerContainerStyles={{borderBottomWidth: 0, height: 70}}
                />
                <BorderCard>
                    <Text>{addressItem.address}</Text>
                    {/* @TODO Implement the address detail card*/}
                </BorderCard>
                <FlatList
                    style={styles.list}
                    data={addressItem.accountAddressList}
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
        flex: 1
    },
    list: {
        flex: 1
    }
});