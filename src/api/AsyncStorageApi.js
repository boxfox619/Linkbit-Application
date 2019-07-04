import {AsyncStorage} from 'react-native'

const AsyncStorageApi = {

  saveObject: async (obj) => {
    for (const key in obj) {
      await AsyncStorage.setItem(key, String(obj[key]))
    }
  },

  getObject: async (keys) => {
    const obj = {}
    for (const key of keys) {
      obj[key] = await AsyncStorage.getItem(key)
    }
    
    return obj
  },
}
export default AsyncStorageApi