import React from 'react';
import { StyleSheet, View } from 'react-native';
import TermsOfServiceView from "./src/containers/TermsOfServiceView";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TermsOfServiceView/>
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
