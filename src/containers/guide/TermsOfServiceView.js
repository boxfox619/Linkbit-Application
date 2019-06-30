import React from 'react'
import { View, Button, StyleSheet, Dimensions, ScrollView, Text } from 'react-native'
import i18n from '../libs/Locale'

export default class TermsOfServiceView extends React.Component {
  onPressConfirm = () => {
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <ScrollView>
            <Text style={{ paddingVertical: 10, paddingHorizontal: 10 }}>{i18n.t('terms')}</Text>
          </ScrollView>
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.onPressConfirm}
            title={i18n.t('agree')}
            color="#594343" />
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
  button: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  contents: {
    width: Dimensions.get('window').width / 100 * 80,
    height: Dimensions.get('window').height / 100 * 80,
    marginBottom: 20,
    borderColor: '#e8a93a',
    borderWidth: 2,
    borderRadius: 12,
  },
})
