import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AddressBuyView from './AddressBuyView'
import AddressBuyFinishView from './AddressBuyFinishView'
import AddressBuyPricingView from './AddressBuyPricingView'

const navigator = createSwitchNavigator({
  AddressEnterView: {
    screen: AddressBuyView,
    navigationOptions: () => ({
      title: 'Getting Address',
      header: null,
    }),
  },
  AddressBuyPricing: {
    screen: AddressBuyPricingView,
    navigationOptions: () => ({
      title: 'Getting Address',
      header: null,
    }),
  },
  AddressBuyFinish: {
    screen: AddressBuyFinishView,
    navigationOptions: () => ({
      title: 'Get Address',
      header: null,
    }),
  },
})

export default createAppContainer(navigator)
