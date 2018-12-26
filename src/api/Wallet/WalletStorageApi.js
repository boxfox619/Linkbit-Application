import {AsyncStorage} from 'react-native';

const WALLET_STORAGE_KEY = "wallets";

export default class WalletStorageApi {

    loadWallets = async () => {
        try {
            const wallets = await AsyncStorage.getItem(WALLET_STORAGE_KEY);
            return wallets || [];
        } catch (error) {
            console.log(error);
        }
    };

    addWallet = async (walletData) => {
        try {
            const wallets = await AsyncStorage.getItem(WALLET_STORAGE_KEY) || [];
            wallets.push(walletData);
            AsyncStorage.setItem(WALLET_STORAGE_KEY, wallets);
        } catch (error) {
            console.log(error);
        }
    };

    removeWallet = async (symbol, address) => {
        try {
            const wallets = await AsyncStorage.getItem(WALLET_STORAGE_KEY) || [];
            const idx = wallets.findIndex(w => (w.symbol === symbol && w.address === address));
            wallets.splice(idx, 1);
            AsyncStorage.setItem(WALLET_STORAGE_KEY, wallets);
        } catch (error) {
            console.log(error);
        }
    }
}