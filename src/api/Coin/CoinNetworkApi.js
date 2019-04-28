import {HOST, COIN_API_HOST} from '../../libs/Constraints'
import encoding from '../../libs/UrlEncoder'

export default class CoinNetworkApi {

    fetchCoins= async () => {
        const res = await fetch(`${COIN_API_HOST}/coins/list`, {method: 'GET'})
        return res.json()
    };

    fetchCoinPrice = async (coinId, currency) => {
        const res = await fetch(`${COIN_API_HOST}/coins/${coinId}?community_data=false&developer_data=false&tickers=false`, {method: 'GET'})
        const data = res.json()
        const price = data['market_data']['current_price'][currency]
        return price
    }
}