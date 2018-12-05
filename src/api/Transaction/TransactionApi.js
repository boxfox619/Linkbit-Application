import {RUNNING_MODE} from '../../libs/Constraints'
import TransactionApiMock from './TransactionApiMock'
import TransactionNetworkApi from './TransactionNetworkApi'

export default {
  create: () => RUNNING_MODE === 'test' ?
    new TransactionApiMock() :
    new TransactionNetworkApi(),
}
