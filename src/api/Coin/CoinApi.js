import {RUNNING_MODE} from '../../libs/Constraints'
import CoinApiMock from './CoinApiMock'
import CoinNetworkApi from './CoinNetworkApi'

export default {
  create: () => {
    if (RUNNING_MODE === 'test') {
      return new CoinApiMock()
    } else {
      return new CoinNetworkApi()
    }
  },
}