import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MainTabView} from "./src/containers";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MainTabView/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
