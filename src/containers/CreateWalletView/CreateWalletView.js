import React from 'react'
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native'
import NavigationButton from '../../components/NavigationButton/NavigationButton'

export default class CreateWalletView extends React.Component {
  state = {
    data: [{
      icon: {},
      name: '비트코인',
      symbol: 'BTC'
    },
    {
      icon: {},
      name: '비트코인',
      symbol: 'BTC'
    },
    {
      icon: {},
      name: '비트코인',
      symbol: 'BTC'
    },
    {
      icon: {},
      name: '비트코인',
      symbol: 'BTC'
    },
    {
      icon: {},
      name: '비트코인',
      symbol: 'BTC'
    },]
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.symbol}</Text>
              </View>
            )} />
          <NavigationButton title={'다음'}/>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  }
})