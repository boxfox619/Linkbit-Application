import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Slider, Text } from 'react-native'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import i18n from '../../libs/Locale'

const CommissionInput = (props) => {
  const { commission, onValueChange } = props

  return (
    <View style={styles.container}>
      <Slider
        step={1}
        minimumValue={0}
        maximumValue={4}
        maximumTrackTintColor="#EBEBEB"
        minimumTrackTintColor={PRIMARY_COLOR}
        onValueChange={onValueChange}
        value={commission} />
      <View style={styles.gridContainer}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
      <Text style={styles.description}>{i18n.t('description_tx_fee')}</Text>
    </View>
  )
}

CommissionInput.propTypes = {
  commission: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gridContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  line: {
    width: 2,
    height: 10,
    borderRadius: 1,
    backgroundColor: 'gray',
  },
  description:{
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A7A8AC',
    textAlign: 'center',
    paddingVertical: 20,
  },
})

export default CommissionInput