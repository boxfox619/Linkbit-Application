import {HOST} from '../../libs/Constraints'
import encoding from '../../libs/UrlEncoder'

export default class AddressNetworkApi {

    fetchOwnAddressList = async (uid) => {
        const res = await fetch(`${HOST}/address`, {
            method: 'GET',
            headers: {'Authorization': uid}
        });
        return res.json();
    };

    buyAddress = async (linkAddress) => {
        const res = await fetch(`${HOST}/address`, {
            method: 'POST',
            headers: {
                'Authorization': '',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encoding({linkAddress})
        });
        return res.json();
    }

    registerAddress = async (linkAddress, symbol, accountAddress) => {
        const res = await fetch(`${HOST}/address/account`, {
            method: 'PUT',
            headers: {
                'Authorization': '',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encoding({
                linkAddress: linkAddress,
                symbol: symbol,
                accountAddress: accountAddress
            })
        });
        return res.ok
    }

    unregisterAddress = async (linkAddress, symbol) => {
        const res = await fetch(`${HOST}/address/account`, {
            method: 'DELETE',
            headers: {
                'Authorization': '',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encoding({
                linkAddress: linkAddress,
                symbol: symbol
            })
        });
        return res.ok
    }

    checkLinkAddressExists = async (linkAddress) => {
        const res = await fetch(`${HOST}/address/exist?address=${linkAddress}`, {method: 'GET'});
        return res.json();
    }

    checkAddressValid = async (symbol, address) => {
        const res = await fetch(`${HOST}/address/valid?symbol=${symbol}&address=${address}`, {method: 'GET'});
        return res;
    }
}