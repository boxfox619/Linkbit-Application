import {RUNNING_MODE} from "../../libs/Constraints";
import AddressApiMock from "./AddressApiMock";
import AddressNetworkApi from "./AddressNetworkApi";

export default {
  create : () => {
    if(RUNNING_MODE==='test'){
      return new AddressApiMock();
    }else{
      return new AddressNetworkApi();
    }
  }
}