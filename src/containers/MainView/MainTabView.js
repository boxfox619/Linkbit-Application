import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WalletListView from "./WalletListView";
import {PRIMARY_COLOR} from "../../libs/Constraints";
import {Header, ButtonGroup} from 'react-native-elements';
import {NavIcon} from "../../components";


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
                    <WalletListView/>
                </View>

                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={this.getTabIcons()}
                    containerStyle={styles.containerStyle}
                    buttonStyle={styles.buttonStyle}
                />
            </View>
        )
    }

    getTabIcons = () => {
        const icon1 = () => <NavIcon icon='payment' label='Wallet' color={this.getIconColor(0)}/>;
        const icon2 = () => <NavIcon icon='swap-horiz' label='Transaction' color={this.getIconColor(1)}/>;
        const icon3 = () => <NavIcon icon='settings' label='Settings' color={this.getIconColor(2)}/>;
        return [{element: icon1}, {element: icon2}, {element: icon3}]
    };

    getIconColor = (idx) => {
        return (idx === this.state.selectedIndex) ? PRIMARY_COLOR : '#777';
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
        height: 50,
        borderWidth: 0,
        backgroundColor: '#fff',
        marginTop: 0,
        borderRadius: 0
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 0
    }
});