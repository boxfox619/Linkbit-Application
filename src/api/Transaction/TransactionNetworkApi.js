import {HOST} from '../../libs/Constraints'
import encoding from '../../libs/UrlEncoder'

export default class TransactionNetworkApi {

    fetchNewTransactions = async (symbol, address, lastBlockNumber) => {
        const res = await fetch(`${HOST}/wallet/${this.symbol}/transactions?symbol=${symbol}address=${address}&lastBlock=${lastBlockNumber}`,
            {method: 'GET'});
        return res.json();
    };

    fetchTransactions = async (txHashList) => {
        const res = await fetch(`${HOST}/transaction/${this.symbol}?txHash=${txHash}`,
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