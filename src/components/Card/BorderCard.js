import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableOpacity} from 'react-native'

export default class BorderCard extends React.Component {

    static propTypes = {
      onPress: PropTypes.func,
      themeColor: PropTypes.string.isRequired,
      activate: PropTypes.bool.isRequired,
    }

    static defaultProps = {
      themeColor: '#000',
      activate: false,
    }

    render() {
      if (this.props.onPress) {
        return (
          <TouchableOpacity onPress={this.props.onPress} style={[styles.container, this.getCardStyle()]}>
            {this.props.children}
          </TouchableOpacity>
        )
      } else {
        return (
          <View style={[styles.container, this.getCardStyle()]}>
            {this.props.children}
          </View>
        )
      }
    }

    getCardStyle = () => {
      const style = {borderColor: this.props.themeColor}
      if (this.props.activate) {
        style.backgroundColor = this.props.themeColor
      }
      
      return style
    }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 3,
    position: 'relative',
  },
})