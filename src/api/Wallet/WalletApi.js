import WalletApiMock from "./WalletApiMock";
import WalletStorageApi from "./WalletStorageApi";
import {RUNNING_MODE} from '../../libs/Constraints';

export default {
    create: () => {
        if (RUNNING_MODE === 'test') {
            return new WalletApiMock();
        } else {
            return new WalletStorageApi();
        }
    }
}