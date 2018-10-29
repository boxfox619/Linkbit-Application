import {fetch} from 'react-native';
import {HOST} from "../libs/Constraints";

class WalletApi {
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

  saveWallet = () => {
  }

  createWallet = async (address, name, password, description, major, open) => {
    try {
      let res = await fetch(`${HOST}/wallet/new`, {
        method: 'GET',
        headers: {
          'Authorization': ''
        },
        body: JSON.stringify({
          address,
          name,
          password,
          description,
          major,
          open
        })
      });
      let resJson = res.json();
      return resJson;
    } catch (error) {
      console.log(error);
    }
  }
}