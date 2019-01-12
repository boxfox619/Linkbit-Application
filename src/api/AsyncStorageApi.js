import {AsyncStorage} from 'react-native';

export default AsyncStorageApi = {

    saveObject: async (obj) => {
        for (const key in obj) {
            await AsyncStorage.setItem(key, obj[key])
        }
    },

    getObject: async (keys) => {
        const obj = {}
        for (const key of keys) {
            obj[key] = await AsyncStorage.getItem(key)
        }
        return obj
    }
}