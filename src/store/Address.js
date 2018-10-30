import {observable} from 'mobx';

export default class Address {
  @observable address;
  @observable linkedAddressList;

  store;

  constructor(store) {
    this.store = store;
  }

  @computed get asJson() {
    return {
      address: this.address,
      linkedAddressList: this.linkedAddressList
    };
  }

  updateFromJson(json) {
    this.address = json.address;
    this.linkedAddressList = json.linkedAddressList;
  }

}