import {RUNNING_MODE} from '../../libs/Constraints'
import TransactionApiMock from './TransactionApiMock'
import TransactionNetworkApi from './TransactionNetworkApi'

export default {
  create : () => {
    if(RUNNING_MODE==='test'){
      return new TransactionApiMock()
    }else{
      return new TransactionNetworkApi()
    }
  },
}