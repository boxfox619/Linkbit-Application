import {fetch} from "react-native";
import {HOST} from "../../libs/Constraints";

export default class CoinNetworkApi {


    fetchAllCoinsPrice = async () => {
        try {
            const res = await fetch(`${HOST}/coin/list`, {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };

    fetchCoinPrice = async (symbol) => {
        try {
            const res = await fetch(`${HOST}/coin?symbol=${symbol}`, {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };

    fetchCoinsPrice = async (symbolList) => {
        try {
            const res = await fetch(`${HOST}/coin/list`, {method: 'POST', body: JSON.stringify({symbols: symbolList})});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };
}