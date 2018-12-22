import { observable } from 'mobx'
import { Dimensions } from 'react-native'

export class UIStore {
  @observable language = 'KR'

  @observable.struct windowDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
}
