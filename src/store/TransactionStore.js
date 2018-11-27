import TransactionApi from '../api/Transaction/TransactionApi';
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

    fetchTransactions = async () => {
        const transactions = await this.transactionApi.fetchTransactions(this.address);
        runInAction(() => {
          this.wallets = wallets.map(json => {
            let transaction = new Transaction();
            transaction.updateFromJson(json);
            this.transactions = transactions;
          });
        });
    }

    @computed
    transactionCount = () => this.transactions.length


}