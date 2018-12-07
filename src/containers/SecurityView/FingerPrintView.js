import React from 'react'
import {View, Text, Button, StyleSheet, Dimensions, Image} from 'react-native'

const backgroundImg = require('./img/bg_fingerprint.png')
const fingerprintImg = require('./img/ic_fingerprint.png')

export default class FingerPrintView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      buttonLabel: '건너뛰기',
    }
  }

  render() {
    const {width, height} = Dimensions.get('window')
    
    return (
      <View style={styles.container}>
        <Image
          style={{position: 'absolute', top: -(height/100 * 10), width: width / 100 * 120}}
          source={backgroundImg}
          resizeMode="contain" />
        <Image
          style={{position: 'absolute', top: height/100 * 36, marginBottom: 40, width: 60}}
          source={fingerprintImg}
          resizeMode="contain" />
        <View style={{position: 'absolute', bottom: 30}}>
          <Text style={styles.title}>지문인식</Text>
          <Text style={styles.content}>
지문인식 등록을 위해
            {'\n'}
            {' '}
홈버튼에 손가락을 올려주세요.
          </Text>
          <Button title={this.state.buttonLabel} onPress={this.onSkipPress} />
        </View>
      </View>
    )
  }

    onSkipPress = () => {

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
    marginBottom: 50,
  },
})