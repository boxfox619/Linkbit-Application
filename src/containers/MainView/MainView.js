import React from 'react';
import {View, StyleSheet, Dimensions, Text, ScrollView} from 'react-native';
import {CoinCard, WalletCard} from "../../components";

export default class MainView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            test: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <CoinCard activate={this.state.test}
                              coinName={'이더리움'}
                              symbol={'ETH'}
                              moneySymbol={'KRW'}
                              balance={'123,14'}
                              price={'231,313,11'}
                              onClick={() => this.setState({test: !this.state.test})}/>
                    <WalletCard name={'나의 이더리움 지갑'} symbol={'ETH'} moneySymbol={'KRW'}/>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});