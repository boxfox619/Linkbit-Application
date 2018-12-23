import {observable} from 'mobx'

export class UserStore {
  @observable language = 'ko'
  @observable currency = 'KRW'
  @observable passCode = undefined
  @observable fingerprint = undefined

  updateSetting = (name, val) => {
    this[name] = val
  }

  getPassCode = () => this.passCode
}

export default UserStore
