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
            headers: {'Authorization': ''},
            body: JSON.stringify({
                linkAddress: linkAddress,
                symbol: symbol,
                accountAddress: accountAddress
            })
        });
        let resJson = res.json();
        return resJson;
    }

    unregisterAddress = async (linkAddress, symbol) => {
        const res = await fetch(`${HOST}/address/account`, {
            method: 'DELETE',
            headers: {'Authorization': ''},
            body: JSON.stringify({
                linkAddress: linkAddress,
                symbol: symbol
            })
        });
        let resJson = res.json();
        return resJson;
    }

    checkLinkAddressExists = async (linkAddress) => {
        const res = await fetch(`${HOST}/address/valid?address=${linkAddress}`, {method: 'GET'});
        let resJson = res.json();
        return resJson;
    }
}