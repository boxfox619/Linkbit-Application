import AsyncStorage from '@react-native-community/async-storage'

const WALLET_STORAGE_KEY = 'wallets'

export default class WalletStorageApi {
    walletList = []

    getWalletList = async () => {
      if(!this.walletList || this.walletList.length === 0){
        await this.loadWalletList()
      }
      
      return this.walletList
    }

    updateWallet = async (walletData) => {
      const walletList = await this.getWalletList()
      const idx = walletList.findIndex(w => (w.symbol === walletData.symbol && w.address === walletData.address))
      walletList.splice(idx, 1, walletData)
      await this.saveWalletList(walletList)
    }

    addWallet = async (walletData) => {
      const walletList = await this.getWalletList()
      walletList.push(walletData)
      await this.saveWalletList(walletList)
    }

    removeWallet = async (symbol, address) => {
      const walletList = await this.getWalletList()
      const idx = walletList.findIndex(w => (w.symbol === symbol && w.address === address))
      walletList.splice(idx, 1)
      await this.saveWalletList(walletList)
    }

    saveWalletList = async (walletList) => {
      this.walletList = walletList
      AsyncStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(walletList))
    }

    loadWalletList = async () => {
      const walletList = await AsyncStorage.getItem(WALLET_STORAGE_KEY) || '[]'
      this.walletList = JSON.parse(walletList)
    }
}