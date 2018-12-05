import {RUNNING_MODE} from '../../libs/Constraints'
import CoinApiMock from './CoinApiMock'
import CoinNetworkApi from './CoinNetworkApi'

export default {
  create: () => RUNNING_MODE === 'test' ?
    new CoinApiMock() :
    new CoinNetworkApi(),
}
