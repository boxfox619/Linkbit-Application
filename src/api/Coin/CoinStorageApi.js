import {AsyncStorage} from 'react-native'

const COIN_STORAGE_KEY = 'coin';
export default class CoinStorageApi {
    coinList = []

    getCoins = async() => {
        if(this.coinList.length === 0){
            await this.loadCoins()
        }
        return this.coinList
    }

    updateCoins = async(coinData) => {
        coinData.array.forEach(coinData => this.update(coinData));
        await this.save()
    }

    updateCoin = async(coinData) => {
        this.update(coinData)
        await this.save()
    }
    
    update = async(coinData) => {
        const idx = this.coinList.findIndex(c => c.symbol === coinData.symbol)
        if (idx > -1) {
            this.coinList.splice(idx, 1, coinData)
        } else {
            this.coinList.push(coinData)
        }
    }

    removeCoin = async (symbol) => {
        const idx = this.coinList.findIndex(c => c.symbol === symbol)
        if (idx > -1) {
            this.coinList.splice(idx, 1)
        }
        await this.save()
    }

    loadCoins = async () => {
        this.coinList = JSON.parse(await AsyncStorage.getItem(COIN_STORAGE_KEY) || '[]')
    }

    save = async() => {
        await AsyncStorage.setItem(COIN_STORAGE_KEY, JSON.stringify(this.coinList))
    }
}