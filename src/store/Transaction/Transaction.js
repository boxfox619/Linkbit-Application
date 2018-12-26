import { observable, computed, runInAction, reaction } from 'mobx'

export default class Transaction {
  @observable hash
  @observable symbol
  @observable sourceAddress
  @observable targetAddress
  @observable amount
  @observable status
  @observable date
  @observable address
  @observable coin
  @observable confirm

  @computed get asJson () {
    return {
      hash: this.hash,
      symbol: this.symbol,
      sourceAddress: this.sourceAddress,
      targetAddress: this.targetAddress,
      amount: this.amount,
      status: this.status,
    }
  }

  updateFromJson (json) {
    this.hash = json.hash
    this.symbol = json.symbol
    this.sourceAddress = json.sourceAddress
    this.targetAddress = json.targetAddress
    this.amount = json.amount
    this.status = json.status
    this.date = json.date
    this.address = json.address
    this.coin = json.coin
    this.confirm = json.confirm
  }
}
