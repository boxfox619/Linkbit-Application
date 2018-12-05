import {RUNNING_MODE} from '../../libs/Constraints'
import AddressApiMock from './AddressApiMock'
import AddressNetworkApi from './AddressNetworkApi'

export default {
  create : () => RUNNING_MODE==='test' ?
    new AddressApiMock() :
    new AddressNetworkApi(),
}
