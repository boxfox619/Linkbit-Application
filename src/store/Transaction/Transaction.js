import {observable, computed, runInAction, reaction} from 'mobx'

export default class Transaction {
    @observable hash
    @observable symbol
    @observable targetAddress
    @observable targetUser
    @observable amount
    @observable status
    @observable date
    @observable confirm

    @computed get asJson() {
        return {
            hash: this.hash,
            symbol: this.symbol,
            targetAddress: this.targetAddress,
            targetUser: this.targetUser,
            amount: this.amount,
            status: this.status,
            date: this.date,
            confirm: this.confirm
        }
    }

    updateFromJson(json) {
        this.hash = json.hash
        this.symbol = json.symbol
        this.benefit = json.benefit
        this.targetAddress = json.targetAddress
        this.targetUser = json.targetUser
        this.amount = json.amount
        this.status = json.status
        this.date = json.date
        this.confirm = json.confirm
    }
}
