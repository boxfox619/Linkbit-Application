import {fetch} from "react-native";
import {HOST} from "../../libs/Constraints";

export default class WalletNetworkApi {
    withdraw = async (wallet, password, amount, targetAddress) => {
        try {
            const res = await await fetch(`${HOST}/withdraw`, {
                method: 'POST',
                headers: {
                    'Authorization': '',
                },
                body: JSON.stringify({
                    wallet,
                    password,
                    amount,
                    target: targetAddress
                }),
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}