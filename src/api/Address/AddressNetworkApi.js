import {HOST} from "../../libs/Constraints";
import {fetch} from "react-native";

export default class AddressNetworkApi {

    fetchOwnAddressList = async () => {

    };

    registerAddress = async (linkedAddress, accountAddress) => {
        try {
            const res = await fetch(`${HOST}/address/link`, {
                method: 'POST',
                headers: {
                    'Authorization': ''
                },
                body: JSON.stringify({
                    linkedAddress: linkedAddress,
                    symbol: accountAddress.symbol,
                    accountAddress: accountAddress.address
                })
            });
            let resJson = res.json();
            return resJson;
        } catch (error) {
            console.log(error);
        }
    }
}