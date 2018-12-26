import {fetch} from 'react-native'
import {HOST} from '../../libs/Constraints'

export default class TransactionNetworkApi {

    fetchTransaction = async (symbol, address, page, count) => {
        try {
            const res = await fetch(`${HOST}/wallet/${symbol}/transactions?address=${address}&page=${page}&count=${count}`,
                {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };

    fetchTransaction = async (symbol, txHash) => {
        try {
            const res = await fetch(`${HOST}/transaction/${symbol}?txHash=${txHash}`, {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };
}