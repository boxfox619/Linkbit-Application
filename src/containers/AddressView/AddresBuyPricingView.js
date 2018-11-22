import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {PricingCard} from 'react-native-elements'
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {inject} from "mobx-react/index";

@inject(['address'])
@observer
export default class AddressBuyView extends React.Component {
    @observable freeable = false

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    { this.freeable &&
                    <PricingCard
                        color={'#4f9deb'}
                        title={'Free'}
                        price={'$0'}
                        info={['1 Address', 'We provide one free address']}
                        button={{ title: 'GET ADDRESS', icon: 'check' }}
                        onButtonPress={this.getFreeAddress}
                    />
                    }
                    <PricingCard
                        color={'#A72CE9'}
                        title={'Buy Address'}
                        price={'$2'}
                        info={['1 Address', 'Buy own address']}
                        button={{ title: 'GET ADDRESS', icon: 'credit-card' }}
                        onButtonPress={this.buyAddress}
                    />
                </ScrollView>
            </View>
        )
    }

    componentWillMount = () => {

    }


    getFreeAddress = () => {

    }

    buyAddress = () => {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        flex: 1
    }
})