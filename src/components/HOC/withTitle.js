import React from 'react'
import { View } from 'react-native'
import Title from '../Label/Title'

const withTitle = Component => ({ title, error, ...props }) => {
  return (
    <View>
      <Title title={title} error={error} />
      <Component {...props} />
    </View>
  )
}

export default withTitle