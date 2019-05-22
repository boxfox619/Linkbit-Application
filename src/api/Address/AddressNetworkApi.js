import {HOST} from '../../libs/Constraints'

export default class AddressNetworkApi {

    fetchOwnAddressList = async (accountAddress) => {
        const res = await fetch(`${HOST}/address`, {
            method: 'GET',
            body: {accountAddress}
        });
        return res.json();
    };

    createToken = async (publicKey) => {
        const res = await fetch(`${HOST}/cert?publicKey=${publicKey}`, { method: 'GET' });
        return res.json();
    }

    createLinkAddress = async (ownerAddress, token, linkAddress) => {
        const res = await fetch(`${HOST}/address`, {
            method: 'POST',
            body: JSON.stringify({ownerAddress, token, linkAddress})
        });
        return res.json();
    }

    linkAddress = async (token, ownerAddress, linkAddress, symbol, accountAddress) => {
        const res = await fetch(`${HOST}/address`, {
            method: 'PUT',
            body: JSON.stringify({ownerAddress, token, linkAddress, symbol, accountAddress})
        });
        return res.json();
    }

    getAccountAddress = async (linkAddress, symbol) => {
        const res = await fetch(`${HOST}/address?linkaddress=${linkAddress}&symbol=${symbol}`, {
            method: 'GET',
        });
        return res.json();
    }

    checkLinkAddressExists = async (linkAddress) => {
        const res = await fetch(`${HOST}/address/exist?address=${linkAddress}`, {method: 'GET'});
        return res.json();
    }
}