import {fetch} from "react-native";
import {HOST} from "../libs/Constraints";

export default class AddressApi {

    fetchLinkedAddressList = async () => {

    }

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