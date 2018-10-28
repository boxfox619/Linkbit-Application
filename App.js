import React from 'react';
import { StyleSheet, View } from 'react-native';
import {FingerPrintView} from "./src/containers";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FingerPrintView/>
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
