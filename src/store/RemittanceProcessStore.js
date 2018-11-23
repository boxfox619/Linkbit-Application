import {observable, computed, runInAction} from 'mobx'
import RemittanceType from './RemittanceType'

export default class RemittanceProcessStore {
    @observable method = RemittanceType.Friend
    @observable step = 1

    constructor() {
    }
}