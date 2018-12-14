import {HOST} from "../../libs/Constraints";
import {fetch} from "react-native";

export default class AddressNetworkApi {

    fetchOwnAddressList = async (uid) => {
        try {
            const res = await fetch(`${HOST}/address`, {
                method: 'GET',
                headers: { 'Authorization': uid }
            });
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };

    buyAddress = async (linkAddress) => {
        try {
            const res = await fetch(`${HOST}/address`, {
                method: 'POST',
                headers: { 'Authorization': '' },
                body: JSON.stringify({address: linkAddress})
            });
            return res.json();
        } catch (error) {
            console.log(error);
        }
    }

    registerAddress = async (linkAddress, symbol, accountAddress) => {
        try {
            const res = await fetch(`${HOST}/address/account`, {
                method: 'PUT',
                headers: { 'Authorization': '' },
                body: JSON.stringify({
                    linkAddress: linkAddress,
                    symbol: symbol,
                    accountAddress: accountAddress
                })
            });
            let resJson = res.json();
            return resJson;
        } catch (error) {
            console.log(error);
        }
    }

    unregisterAddress = async (linkAddress, symbol) => {
        try {
            const res = await fetch(`${HOST}/address/account`, {
                method: 'DELETE',
                headers: { 'Authorization': '' },
                body: JSON.stringify({
                    linkAddress: linkAddress,
                    symbol: symbol
                })
            });
            let resJson = res.json();
            return resJson;
        } catch (error) {
            console.log(error);
        }
    }

    checkLinkAddressExists = async (linkAddress) => {
        try {
            const res = await fetch(`${HOST}/address/valid?address=${linkAddress}`, {method: 'GET'});
            let resJson = res.json();
            return resJson;
        } catch (error) {
            console.log(error);
        }
    }
}