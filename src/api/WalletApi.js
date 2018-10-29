import {fetch} from 'react-native';
import {HOST} from "../libs/Constraints";

class WalletApi {
  fetchWallets = () => {
    fetch(`${HOST}/wallet/list`, {
      method: 'GET',
      headers: {
        'Authorization': ''
      }
    }).then(res => {

    })
    .catch(error => {

    });
  };

  saveWallet = (address, name, password, description, major, open) => {
  }

  createWallet = (wallet) => {
    fetch(`${HOST}/wallet/new`, {
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
    }).then(res => {

    })
    .catch(error => {

    });
  }
}