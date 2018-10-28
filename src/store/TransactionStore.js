import TransactionApi from '../api/TransactionApi';
import {observable, computed, runInAction} from 'mobx';

export class TransactionStore{
    @observable transactions = [];
    address;
    transactionApi;

    constructor(address){
        this.address = address;
        this.transactionApi = new TransactionApi();
    }

    fetchTransactions = async () => {
        const transactions = await this.walletApi.fetchTransactions(this.address);
        runInAction(() => {
            this.transactions = transactions;
        });
    }

    @computed
    transactionCount = () => this.transactions.length


}