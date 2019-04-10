import {observable, computed, runInAction, reaction} from 'mobx'

export default class Transaction {
    @observable hash
    @observable symbol
    @observable sourceAddress
    @observable targetAddress
    @observable targetUser
    @observable amount
    @observable status
    @observable date
    @observable confirm

    constructor(
        hash,
        symbol,
        sourceAddress,
        targetAddress,
        targetUser,
        amount,
        status,
        date,
        confirm
    ){
        this.hash = hash
        this.symbol = symbol
        this.sourceAddress = sourceAddress
        this.targetAddress = targetAddress
        this.targetUser = targetUser
        this.amount = amount
        this.status = status
        this.date = date
        this.confirm = confirm
    }

    @computed get asJson() {
        return {
            hash: this.hash,
            symbol: this.symbol,
            targetAddress: this.targetAddress,
            sourceAddress: this.sourceAddress,
            amount: this.amount,
            status: this.status,
            date: this.date,
            confirm: this.confirm
        }
    }

    updateFromJson(json) {
        this.hash = json.hash
        this.symbol = json.symbol
        this.sourceAddress = json.sourceAddress
        this.targetAddress = json.targetAddress
        this.amount = json.amount
        this.status = json.status
        this.date = json.date
        this.confirm = json.confirm
    }
}
