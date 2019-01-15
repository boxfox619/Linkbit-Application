import {RUNNING_MODE} from "../../libs/Constraints";
import AuthApi from './AuthApi';
import AuthStorageApi from './AuthStorageApi';

export default {
    create : () => {
        if(RUNNING_MODE==='test'){
            return new AuthApi();
        }else{
            return new AuthStorageApi();
        }
    }
}