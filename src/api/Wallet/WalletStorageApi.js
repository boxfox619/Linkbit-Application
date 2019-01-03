import {AsyncStorage} from 'react-native';

const WALLET_STORAGE_KEY = "wallets";

export default class WalletStorageApi {

    loadWallets = async () => {
        try {
            const wallets = await this.getWalletList();
            return wallets || [];
        } catch (error) {
            console.log(error);
        }
    };

    addWallet = async (walletData) => {
        try {
            const wallets = await this.getWalletList();
            wallets.push(walletData);
            AsyncStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(wallets));
        } catch (error) {
            console.log(error);
        }
    };

    removeWallet = async (symbol, address) => {
        try {
            const wallets = await this.getWalletList();
            const idx = wallets.findIndex(w => (w.symbol === symbol && w.address === address));
            wallets.splice(idx, 1);
            AsyncStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(wallets));
        } catch (error) {
            console.log(error);
        }
    }

    getWalletList = async () => {
        const wallets = await AsyncStorage.getItem(WALLET_STORAGE_KEY) || '[]'
        return JSON.parse(wallets)
    }
}