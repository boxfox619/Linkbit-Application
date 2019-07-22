import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

export const HeaderButtonWithTitle = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onIconClicked} style={{ marginRight: 15 }}>
        <Icon name={props.icon} size={35} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

HeaderButtonWithTitle.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  onIconClicked: PropTypes.func,
}

HeaderButtonWithTitle.defaultProps = {
  icon: 'arrow-back',
  title: '',
  onIconClicked: () => {
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
})

export default HeaderButtonWithTitle