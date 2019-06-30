import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const Title = ({ title, error }) => {
  return (
    <View style={styles.label}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 'auto',
    position: 'relative',
  },
  title: {
    color: '#594343',
    fontSize: 14,
    fontWeight: 'bold',
  },
  error: {
    position: 'absolute',
    color: 'red',
    right: 0,
    top: 0,
    marginHorizontal: 'auto',
  },
})

export default Title