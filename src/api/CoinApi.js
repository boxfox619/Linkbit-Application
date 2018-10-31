import {fetch} from "react-native";
import {HOST} from "../libs/Constraints";

export default class CoinApi {

    fetchCoinPrices = async (symbols) => {
        try {
            const res = await fetch(`${HOST}/coin/list`, {
                method: 'POST',
                headers: {
                    'Authorization': ''
                },
                body: JSON.stringify({
                    coins: symbols
                })
            });
            let resJson = res.json();
            return resJson;
        } catch (error) {
            console.log(error);
        }
    }
}