import {HOST} from "../../libs/Constraints";
import encoding from '../../libs/UrlEncoder';

export default class WalletNetworkApi {
    createWallet = async (symbol, password) => {
            const res = await fetch(`${HOST}/wallet`, {
                method: 'POST',
                headers: {
                    'Authorization': '',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: encoding({
                    symbol,
                    password
                }),
            });
            return res.json();
    }

    importWallet = async (symbol, type, data) => {
        const res = await fetch(`${HOST}/wallet/import`, {
            method: 'POST',
            headers: {
                'Authorization': '',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encoding({
                symbol,
                type,
                data
            }),
        });
        return res.json()
    }

    getBalance = async (symbol, address) => {
        const res = await fetch(`${HOST}/wallet/balance?symbol=${symbol}&address=${address}`, {method: 'GET'});
        return res.json()
    }
}