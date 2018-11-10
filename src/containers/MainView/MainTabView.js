import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WalletListView from "./WalletListView";
import {PRIMARY_COLOR} from "../../libs/Constraints";
import {Header} from 'react-native-elements';
import {Navbar} from "../../components";


export default class MainTabView extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedIndex: 0
        }
    }

    render() {
        const {selectedIndex} = this.state;
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={'#ffffff'}
                    leftComponent={<Text style={styles.title}>WALLET</Text>}
                    rightComponent={{icon: 'payment', color: '#000000', marginRight: 10}}
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

    renderContents = () =>{
        switch(this.state.selectedIndex){
            case 0: return <WalletListView/>;
            case 1: return <View></View>;
            case 2: return <View></View>;
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
        this.setState({selectedIndex})
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