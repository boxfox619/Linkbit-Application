import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image } from 'react-native'

export default class CardSummary extends React.Component {
  render() {
    const { symbol, balance, linkedAddress, accountAddress } = this.props

    return (
      <View style={styles.cardSummary}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} />
        </View>
        <Text style={styles.title}>해당 주소로</Text>
        <Text style={styles.title}>
          <Text style={[styles.title, { fontWeight: 'bold' }]}>{`${symbol} ${balance} `}</Text>
          <Text style={styles.title}>송금 완료</Text>
        </Text>
        <Text style={styles.detail}>{`받는 주소 : ${linkedAddress}`}</Text>
        <View style={styles.container}>
          <Text style={styles.key}>출금 지갑</Text>
          <Text style={styles.value}>{accountAddress}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.key}>송금 후 잔액</Text>
          <Text style={styles.value}>잔액</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardSummary: {
    position: 'relative',
    backgroundColor: '#627EEA',
    width: '100%',
    height: 318,
    borderRadius: 6,
    padding: 20,
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    padding: 20,
    top: 0,
    right: 0,
  },
  icon: {
    width: 32,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
  detail: {
    color: '#B0BEF5',
    fontSize: 16,
    marginVertical: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#B0BEF5',
    borderBottomWidth: 1,
    height: 40,
  },
  key: {
    color: 'white',
    lineHeight: 40,
    fontSize: 16,
  },
  value: {
    color: 'white',
    lineHeight: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
})