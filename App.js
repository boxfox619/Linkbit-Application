import React from 'react';
import { StyleSheet, View } from 'react-native';
import PinCodeInputView from "./src/containers/PinCodeInputView";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PinCodeInputView/>
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
