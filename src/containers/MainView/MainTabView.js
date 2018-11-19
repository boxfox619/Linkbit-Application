import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WalletListView from "./WalletListView";
import {PRIMARY_COLOR} from "../../libs/Constraints";
import {Header} from 'react-native-elements';
import {Navbar} from "../../components";
import TransactionListView from "../TransactionListView/TransactionListView"

export default class MainTabView extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            headerTitle: 'WALLET',
            headerIcon: {}
        }
    }

    render() {
        const {selectedIndex} = this.state;
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={'#ffffff'}
                    leftComponent={<Text style={styles.title}>{this.state.headerTitle}</Text>}
                    rightComponent={this.state.headerIcon}
                    outerContainerStyles={{borderBottomWidth: 0, height: 80}}
                />
                <View style={styles.content}>
                    {this.renderContents()}
                </View>
                <Navbar
                    onTabSelected={this.updateIndex}
                    selectedIndex={selectedIndex}
                    tabs={this.tabs}
                    containerStyle={styles.containerStyle}
                />
            </View>
        )
    }

    componentDidMount() {
        this.updateIndex(0);
    }

    renderContents = () => {
        switch (this.state.selectedIndex) {
            case 0:
                return <WalletListView/>;
            case 1:
                return <TransactionListView/>;
            case 2:
                return <View></View>;
        }
    }

    get tabs() {
        return [
            {icon: 'payment', label: 'Wallet'},
            {icon: 'swap-horiz', label: 'Transaction'},
            {icon: 'settings', label: 'Settings'}
        ];
    };

    updateIndex = (selectedIndex) => {
        let state = {selectedIndex};
        switch (selectedIndex) {
            case 0:
                state.headerTitle = 'WALLET';
                state.headerIcon = {icon: 'payment', color: '#000000', marginRight: 10};
                break;
            case 1:
                state.headerTitle = 'TRANSACTION';
                state.headerIcon = undefined;
                break;
            case 2:
                state.headerTitle = 'SETTING';
                state.headerIcon = undefined;
                break;
        }
        this.setState(state);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    content: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    containerStyle: {
        height: 60,
        backgroundColor: PRIMARY_COLOR
    }
});