import {HOST} from '../../libs/Constraints'
import encoding from '../../libs/UrlEncoder'

export default class CoinNetworkApi {

    fetchCoins= async () => {
        try {
            const res = await fetch(`${HOST}/coins`, {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };

    fetchCoinPrices = async (symbols) => {
        const res = await fetch(`${HOST}/coins/price`, {
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