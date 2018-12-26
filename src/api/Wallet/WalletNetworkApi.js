import {fetch} from "react-native";
import {HOST} from "../../libs/Constraints";

export default class WalletNetworkApi {
    createWallet = async (symbol, password) => {
        try {
            const res = await await fetch(`${HOST}/wallet`, {
                method: 'POST',
                headers: {
                    'Authorization': '',
                },
                body: JSON.stringify({
                    symbol,
                    password
                }),
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    getBalance = async (symbol, address) => {
        try {
            const res = await await fetch(`${HOST}/wallet/balance?symbol=${symbol}&address=${address}`, {method: 'GET'});
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}