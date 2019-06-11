import axios from 'axios'
import { HOST } from '../../libs/Constraints'

export const fetchOwnAddressList = async (accountAddress) => {
    const res = await axios.get(`${HOST}/address?ownerAddress=${accountAddress}`);
    return res.data;
};

export const createToken = async (publicKey) => {
    try {
        const res = await axios.get(`${HOST}/cert?publicKey=${publicKey}`);
        if (res.status === 200) {
            return res.data.token
        } else {
            throw new Error(res.data.message)
        }
    } catch (e) {
        throw new Error('failed to create token')
    }
}

export const createLinkAddress = async (ownerAddress, token, linkaddress) => {
    try {
        const res = await axios.post(`${HOST}/address`, { ownerAddress, token, linkaddress });
        if (res.status === 200) {
            return true;
        } else {
            throw new Error(res.data.message);
        }
    } catch (e) {
        throw new Error(e.response.data.message);
    }
}

export const deleteLinkAddress = async (token, linkaddress) => {
    try {
        const res = await axios.delete(`${HOST}/address`, { data: { token, linkaddress } });
        if (res.status === 200) {
            return true;
        } else {
            throw new Error(res.data.message);
        }
    } catch (e) {
        throw new Error(e.response.data.message);
    }
}

export const linkAddress = async (token, linkaddress, symbol, accountaddress) => {
    try {
        const res = await axios.put(`${HOST}/link`, { token, linkaddress, symbol, accountaddress })
        if (res.status === 200) {
            return true;
        } else {
            throw new Error(res.data.message);
        }
    } catch (e) {
        throw new Error(e.response.data.message);
    }
}

export const unlinkAddress = async (token, linkaddress, symbol) => {
    try {
        const res = await axios.delete(`${HOST}/link`, { data: { token, linkaddress, symbol } })
        if (res.status === 200) {
            return true;
        } else {
            throw new Error(res.data.message);
        }
    } catch (e) {
        throw new Error(e.response.data.message);
    }
}

export const getAccountAddress = async (linkAddress, symbol) => {
    const res = await axios.get(`${HOST}/address?linkaddress=${linkAddress}&symbol=${symbol}`)
    if (res.status === 200) {
        return res.data.address
    }
}

export const checkLinkAddressExists = async (linkAddress) => {
    const res = await axios.get(`${HOST}/address/exist?address=${linkAddress}`)
    return res.data
}