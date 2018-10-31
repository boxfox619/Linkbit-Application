import WalletApiTest from "./WalletApiTest";
import WalletNetworkApi from "./WalletNetworkApi";
import {RUNNING_MODE} from '../../libs/Constraints';

export default {
    create : () => {
        if(RUNNING_MODE==='test'){
            return new WalletApiTest();
        }else{
            return new WalletNetworkApi();
        }
    }
}