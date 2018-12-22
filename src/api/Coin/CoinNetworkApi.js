import {fetch} from 'react-native'
import {HOST} from '../../libs/Constraints'

export default class CoinNetworkApi {

    fetchCoins = async (symbols) => {
      try {
        const res = await fetch(`${HOST}/coin/list`, {
          method: 'POST',
          headers: {
            'Authorization': '',
          },
          body: JSON.stringify({
            coins: symbols,
          }),
        })
        const resJson = res.json()
        
        return resJson
      } catch (error) {
        console.log(error)
      }
    }
}