import WalletApiMock from './WalletApiMock'
import WalletNetworkApi from './WalletNetworkApi'
import {RUNNING_MODE} from '../../libs/Constraints'

export default {
  create: () => RUNNING_MODE === 'test' ?
    new WalletApiMock() :
    new WalletNetworkApi(),
}
