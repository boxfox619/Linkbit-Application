import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

const SettingListView = (props) => {
  const { list, onItemSelected, style } = props

  return (
    <View style={[styles.container, style]}>
      {
        list.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.listItem}
            onPress={() => onItemSelected(item.key)}>
            <Text style={[styles.mainTxt, styles.labelStyle]}>{item.labelText}</Text>
            <Text style={[styles.subTxt, styles.subLabelStyle]}>{item.subLabelText}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

SettingListView.propTypes = {
  list: PropTypes.array.isRequired,
  onItemSelected: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  mainTxt: {
    fontSize: 14,
  },
  subTxt: {
    fontSize: 10,
    color: '#808080',
    textAlign: 'right',
    marginLeft: 'auto',
  },
})

export default SettingListView