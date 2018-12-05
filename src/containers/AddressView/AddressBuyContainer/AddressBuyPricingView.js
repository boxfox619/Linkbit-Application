import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {PricingCard} from 'react-native-elements'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'

@inject(['address'])
@observer
export default class AddressBuyPricingView extends React.Component {
    @observable freeable = false

    static get options() {
      return {topBar: {title: {text: '주소 구매'}}}
    }

    render() {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
            { this.freeable && (
              <PricingCard
                color="#4f9deb"
                title="Free"
                price="$0"
                info={['1 Address', 'We provide one free address']}
                button={{ title: 'GET ADDRESS', icon: 'check' }}
                onButtonPress={this.getFreeAddress} />
            )}
            <PricingCard
              color="#A72CE9"
              title="GET Address"
              price="$2"
              info={['1 Address', 'Buy own address']}
              button={{ title: 'GET ADDRESS', icon: 'credit-card' }}
              onButtonPress={this.buyAddress} />
          </ScrollView>
        </View>
      )
    }

    componentWillMount = () => {

    }


    getFreeAddress = () => {
      this.props.navigation.navigate('AddressBuyFinish')
    }

    buyAddress = () => {
      this.props.navigation.navigate('AddressBuyFinish')
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
})