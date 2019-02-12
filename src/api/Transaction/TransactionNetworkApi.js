import {HOST} from '../../libs/Constraints'
import encoding from '../../libs/UrlEncoder'

export default class TransactionNetworkApi {

    constructor(symbol, address){
        this.symbol = symbol
        this.address = address
    }

    fetchNewTransactions = async (lastBlockNumber) => {
        const res = await fetch(`${HOST}/wallet/${this.symbol}/transactions?address=${this.address}&lastBlock=${lastBlockNumber}`,
            {method: 'GET'});
        return res.json();
    };

    fetchTransactions = async (txHashList) => {
        const res = await fetch(`${HOST}/transaction/${this.symbol}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': '',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: encoding({transactions: txHashList})
            }
        );
        return res.json();
    }

    fetchTransaction = async (txHash) => {
        const res = await fetch(`${HOST}/transaction/${this.symbol}?txHash=${txHash}`, {method: 'GET'});
        return res.json();
    };
}