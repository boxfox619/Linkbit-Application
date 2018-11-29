import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PinCodeInputView form './PinCodeInputView'

export default class SecurityView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstTime: true
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          isFirstTime ?
            <PinCodeInputView/> :
            <TouchableOpacity
              key={i}
              style={styles.listItem}
              onPress={() => onPressMethod(item.val)}>
              <Text>{item.txt}</Text>
            </TouchableOpacity>
        }
      </View>
    )
  }

  onPressMethod = method => {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  content: {
    textAlign: 'center',
    marginBottom: 50
  }
});
