import {observable} from 'mobx'
import {action, computed} from 'mobx/lib/mobx'

export class UserStore {
  @observable language = 'ko'
  @observable currency = 'KRW'
  @observable passCode = undefined
  @observable fingerPrint = undefined

  updateSetting = (name, val) => {
    this[name] = val
  }

  getIsLocked = () => Boolean(this.passCode || this.fingerPrint)
  getPassCode = () => this.passCode
  getFingerPrint = () => this.fingerPrint

  @computed get passCode () {
    return this.passCode
  }
}

export default UserStore
