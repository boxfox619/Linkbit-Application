import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import NavIcon from './NavIcon'

const Navbar = (props) => {
  const tabs = props.tabs.map((tab, idx) => {
    return (
      <TouchableOpacity
        key={tab.icon}
        style={{ flex: 1 }}
        onPress={() => props.onTabSelected(idx)}>
        <NavIcon
          icon={tab.icon}
          label={tab.label}
          color={props.selectedIndex === idx ? props.activeColor : props.defaultColor} />
      </TouchableOpacity>
    )
  })

  return (
    <View style={[styles.container, props.containerStyle]}>
      {tabs}
    </View>
  )
}

Navbar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  onTabSelected: PropTypes.func,
  selectedIndex: PropTypes.number,
  defaultColor: PropTypes.string,
  activeColor: PropTypes.string,
  containerStyle: View.PropTypes.style,
}

Navbar.defaultProps = {
  tabs: [],
  onTabSelected: () => {
  },
  selectedIndex: 0,
  defaultColor: '#ACA1A1',
  activeColor: '#fff',
  containerStyle: {},
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Navbar