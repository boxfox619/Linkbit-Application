import {HOST} from '../../libs/Constraints'
import encoding from '../../libs/UrlEncoder'

export default class CoinNetworkApi {

    fetchAllCoinsPrice = async () => {
        try {
            const res = await fetch(`${HOST}/coins`, {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };

    fetchCoinPrice = async (symbol) => {
        try {
            const res = await fetch(`${HOST}/coins/${symbol}`, {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };

    fetchCoins = async (symbols) => {
        const res = await fetch(`${HOST}/coins`, {
            method: 'POST',
            headers: {
                'Authorization': '',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encoding({symbols}),
        })
        return res.json()
    }
}