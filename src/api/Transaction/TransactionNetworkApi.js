import {fetch} from 'react-native'
import {HOST} from '../../libs/Constraints'

export default class TransactionNetworkApi {
    constructor(symbol, address) {
        this.symbol = symbol
        this.address = address
    }

    fetchNewTransactions = async (page, count) => {
        try {
            const res = await fetch(`${HOST}/wallet/${this.symbol}/transactions?address=${this.address}&page=${page}&count=${count}`,
                {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };

    fetchTransaction = async (txHash) => {
        try {
            const res = await fetch(`${HOST}/transaction/${this.symbol}?txHash=${txHash}`, {method: 'GET'});
            return res.json();
        } catch (error) {
            console.log(error);
        }
    };
}