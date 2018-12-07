import {fetch} from 'react-native'
import {HOST} from '../../libs/Constraints'

export default class TransactionNetworkApi {
  fetchTransactions = async (address, page, count) => {
    try {
      const res = await fetch(`${HOST}/transaction/list?address=${address}&page=${page}&count=${count}`, {
        method: 'GET',
        headers: {
          'Authorization': '',
        },
      })
      const resJson = res.json()
      
      return resJson
    } catch (error) {
      console.log(error)
    }
  }
}