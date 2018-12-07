import WalletApiMock from './WalletApiMock'
import WalletNetworkApi from './WalletNetworkApi'
import {RUNNING_MODE} from '../../libs/Constraints'

export default {
  create : () => {
    if(RUNNING_MODE==='test'){
      return new WalletApiMock()
    }else{
      return new WalletNetworkApi()
    }
  },
}