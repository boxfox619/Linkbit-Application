import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class FriendBox extends React.Component {
  render() {
    const { mail } = this.props

    return (
      <View style={styles.toFriendContainer}>
        <View>
          <Text style={styles.name}>이름</Text>
          <Text style={styles.address}>주소</Text>
        </View>
        <Text style={styles.toFriendText}>{mail}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  toFriendContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#594343',
    backgroundColor: '#594343',
    borderRadius: 5,
    borderWidth: 3,
    height: 53,
    width: '100%',
    paddingHorizontal: 13,
    alignContent: 'center',
    alignItems: 'center',
  },
  name:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  address:{
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.5,
  },
  toFriendText: {
    fontSize: 14,
    color: '#ffffff',
  },
})