import {fetch} from "react-native";
import {HOST} from "../../libs/Constraints";

export default class TransactionNetworkApi {

    fetchTransactionByWallet = async (symbol, address, page, count) => {
        try {
            const res = await fetch(`${HOST}/transaction/list?symbol=${symbol}address=${address}&page=${page}&count=${count}`,
                {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };

    fetchTransaction = async (symbol, txHash) => {
        try {
            const res = await fetch(`${HOST}/transaction?symbol=${symbol}&txHash=${txHash}`, {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };
}