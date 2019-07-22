import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export default class SegmentedControl extends React.Component {
    static propTypes = {
      selectedIndex: PropTypes.number.isRequired,
    }

    renderOptions = () => {
      const {options, selectedIndex} = this.props

      return (options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={
            [
              styles.option,
              index === 0 ? null : styles.marginLeft,
              selectedIndex === index ? styles.selected : null]}
          onPress={() => {
            this.props.onChange(index)
          }}>
          <Text style={[styles.optionName, selectedIndex === index ? styles.selectedText : null]}>{option}</Text>
        </TouchableOpacity>
      )))
    }

    render() {
      return (
        <View style={styles.optionContainer}>
          {
            this.renderOptions()
          }
        </View>
      )
    }
}

const styles = StyleSheet.create({
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  option: {
    borderColor: '#594343',
    borderRadius: 5,
    borderWidth: 3,
    height: 53,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: 5,
  },
  optionName: {
    color: '#594343',
    textAlign: 'center',
    fontSize: 14,
  },
  selected: {
    borderColor: '#594343',
    backgroundColor: '#594343',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
})
