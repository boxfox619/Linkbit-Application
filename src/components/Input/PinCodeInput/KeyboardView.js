import React from 'react'
import { Animated, FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import deleteIcon from '../../../assets/ic_delete.png'

const KeyboardView = ({keyboardOnPress, pinLength, onComplete, bgColor, returnType, textColor, deleteText, animatedDeleteButtonOnPress, styles}) => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'empty', '0', deleteText]
  const renderItem = ({item, index}) => {
    let style
    let onPressActive
    let component
    if (item === 'empty') {
      return (<View style={[styles[0]]}/>)
    }
    if (item === deleteText) {
      onPressActive = animatedDeleteButtonOnPress
      style = [styles[0]]
      component = (<Image style={{width: 30, height: 30}} source={deleteIcon}/>)
    } else {
      onPressActive = false
      style = [styles[0]]
      component = (
        <Text style={[
          styles[1], {
            color: textColor,
            opacity: 1,
          }]}>
          {item}
        </Text>
      )
    }

    return (
      <TouchableOpacity
        onPress={() => keyboardOnPress(item, returnType, pinLength, onComplete)}
        disabled={onPressActive}>
        <Animated.View style={[
          style, {
            backgroundColor: bgColor,
          }]}>
          {component}
        </Animated.View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      scrollEnabled={false}
      horizontal={false}
      vertical
      numColumns={3}
      renderItem={renderItem}
      data={data}
      keyExtractor={(val, index) => 'pinViewItem-' + index}/>
  )
}
export default KeyboardView
