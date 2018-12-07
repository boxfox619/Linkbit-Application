import {fetch} from 'react-native'
import {HOST} from '../../libs/Constraints'

export default class WalletNetworkApi {
  fetchWallets = async () => {
    try {
      const res = await fetch(`${HOST}/wallet/list`, {
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
  };

  updateWallet = async (address, name, password, description) => {
    try {
      const res = await fetch(`${HOST}/wallet`, {
        method: 'PUT',
        headers: {
          'Authorization': '',
        },
        body: JSON.stringify({
          address,
          name,
          password,
          description,
        }),
      })
      const resJson = res.json()
      
      return resJson
    } catch (error){
      console.log(error)
    }
  }

  createWallet = async (address, name, password, description) => {
    try {
      const res = await fetch(`${HOST}/wallet/new`, {
        method: 'POST',
        headers: {
          'Authorization': '',
        },
        body: JSON.stringify({
          address,
          name,
          password,
          description,
        }),
      })
      const resJson = res.json()
      
      return resJson
    } catch (error) {
      console.log(error)
    }
  }
}