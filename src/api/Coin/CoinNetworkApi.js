import axios from 'axios'
import {COIN_API_HOST} from '../../libs/Constraints'

export default class CoinNetworkApi {

    fetchCoins = async () => {
      const res = await axios.get(`${COIN_API_HOST}/coins/list`, {method: 'GET'})
      
      return res.data
    }

    fetchCoinPrice = async (coinId, currency) => {
      const res = await axios.get(`${COIN_API_HOST}/coins/${coinId}?community_data=false&developer_data=false&tickers=false`, {method: 'GET'})
      const data = await res.data
      const price = data['market_data']['current_price'][currency.toLowerCase()]
      
      return price
    }
}