import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GuideView} from "./src/containers";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <GuideView/>
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
