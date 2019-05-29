import axios from 'axios'
import {HOST} from '../../libs/Constraints'

export const fetchOwnAddressList = async (accountAddress) => {
    const res = await axios.get(`${HOST}/address?ownerAddress=${accountAddress}`);
    return res.data;
};

export const createToken = async (publicKey) => {
    const res = await axios.get(`${HOST}/cert?publicKey=${publicKey}`);
    return res.data;
}

export const createLinkAddress = async (ownerAddress, token, linkAddress) => {
    const res = await axios.post(`${HOST}/address`, {ownerAddress, token, linkAddress});
    return res.data;
}

export const linkAddress = async (token, ownerAddress, linkAddress, symbol, accountAddress) => {
    const res = await axios.put(`${HOST}/address`, {ownerAddress, token, linkAddress, symbol, accountAddress});
    return res.data;
}

export const getAccountAddress = async (linkAddress, symbol) => {
    const res = await axios.get(`${HOST}/address?linkaddress=${linkAddress}&symbol=${symbol}`);
    return res.data;
}

export const checkLinkAddressExists = async (linkAddress) => {
    const res = await axios.get(`${HOST}/address/exist?address=${linkAddress}`);
    return res.data;
}