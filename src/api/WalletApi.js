import {fetch} from 'react-native';
import {HOST} from "../libs/Constraints";

export default class WalletApi {
  fetchWallets = async () => {
    try {
      const res = await fetch(`${HOST}/wallet/list`, {
        method: 'GET',
        headers: {
          'Authorization': ''
        }
      });
      let resJson = res.json();
      return resJson;
    } catch (error) {
      console.log(error);
    }
  };

  updateWallet = async (address, name, password, description) => {
    try {
      let res = await fetch(`${HOST}/wallet`, {
        method: 'PUT',
        headers: {
          'Authorization': ''
        },
        body: JSON.stringify({
          address,
          name,
          password,
          description
        })
      });
      let resJson = res.json();
      return resJson;
    } catch (error){
      console.log(error);
    }
  }

  createWallet = async (address, name, password, description) => {
    try {
      let res = await fetch(`${HOST}/wallet/new`, {
        method: 'POST',
        headers: {
          'Authorization': ''
        },
        body: JSON.stringify({
          address,
          name,
          password,
          description
        })
      });
      let resJson = res.json();
      return resJson;
    } catch (error) {
      console.log(error);
    }
  }
}