import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import NavIcon from './NavIcon'

export default class Navbar extends React.Component {

  static propTypes = {
    tabs: PropTypes.array.isRequired,
    onTabSelected: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    defaultColor: PropTypes.string.isRequired,
    activeColor: PropTypes.string.isRequired,
    containerStyle: PropTypes.any.isRequired,
  }

  static defaultProps = {
    tabs: [],
    onTabSelected: () => {
    },
    selectedIndex: 0,
    defaultColor: '#ACA1A1',
    activeColor: '#fff',
    containerStyle: {},
  }

  render () {
    const tabs = this.props.tabs.map((tab, idx) => {
      return (
        <TouchableOpacity
          key={tab.icon}
          style={{flex: 1}}
          onPress={() => this.props.onTabSelected(idx)}>
          <NavIcon
            icon={tab.icon}
            label={tab.label}
            color={this.props.selectedIndex === idx ? this.props.activeColor : this.props.defaultColor}/>
        </TouchableOpacity>
      )
    })

    return (
      <View style={[styles.container, this.props.containerStyle]}>
        {tabs}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

