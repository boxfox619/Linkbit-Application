import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'

const backgroundImg = require('../../assets/img_fingerprint.png')

export default class FingerPrintView extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {width, height} = Dimensions.get('window')

    return (
      <View style={styles.container}>
        <Image
          style={{top: -70, width: width / 100 * 120}}
          source={backgroundImg}
          resizeMode="contain"/>
        <View style={{position: 'absolute', bottom: 30}}>
          <Text style={styles.title}>지문인식</Text>
          <Text style={styles.content}>
            지문인식 등록을 위해
            {'\n'}
            {' '}
            홈버튼에 손가락을 올려주세요.
          </Text>
        </View>
      </View>
    )
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
