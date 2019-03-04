import {HOST} from '../../libs/Constraints'
import encoding from '../../libs/UrlEncoder'

export default class TransactionNetworkApi {

    constructor(symbol, address){
        this.symbol = symbol
        this.address = address
    }

    fetchNewTransactions = async (lastBlockNumber) => {
        const res = await fetch(`${HOST}/transactions/${this.symbol}?address=${this.address}&lastBlock=${lastBlockNumber}`,
            {method: 'GET'})
        if(!res.ok){
            throw Error('신규 트렌잭션 로드 실패')
        }
        return res.json()
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
        if(!res.ok){
            throw Error('트렌잭션 업데이트 실패')
        }
        return res.json()
    }

    fetchTransaction = async (txHash) => {
        const res = await fetch(`${HOST}/transaction/${this.symbol}?txHash=${txHash}`, {method: 'GET'});
        if(!res.ok){
            throw Error('트렌잭션 로드 실패')
        }
        return {...res.json(), symbol : this.symbol};
    };
}