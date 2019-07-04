import React from 'react'
import { View } from 'react-native'
import Title from '../Label/Title'

const withTitle = Component => {
  const wrapper = ({ title, error, ...props }) => {
    return (
      <View>
        <Title title={title} error={error} />
        <Component {...props} />
      </View>
    )
  }
  wrapper.displayName = 'WithTitleWrapper'
  
  return wrapper
}

export default withTitle