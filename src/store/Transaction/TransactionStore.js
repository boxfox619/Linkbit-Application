import TransactionApi from '../../api/Transaction/TransactionApi';
import {observable, computed, runInAction} from 'mobx';
import Transaction from "./Transaction";

export default class TransactionStore{
    @observable transactions = [];
    address;
    transactionApi;

    constructor(address){
        this.address = address;
        this.transactionApi = TransactionApi.create();
    }

    fetchTransactions = async (page, count) => {
        const transactions = await this.transactionApi.fetchTransactions(this.address, page, count);
        runInAction(() => {
          transactions.forEach(json => {
            let transaction = new Transaction();
            transaction.updateFromJson(json);
            this.transactions.push(transaction);
          });
        });
    }

    @computed get transactionCount() {
        return this.transactions.length
    }
}