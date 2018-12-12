import {AsyncStorage} from 'react-native';

export default class WalletStorageApi {

    loadWallets = async () => {
        try {
            const wallets = await AsyncStorage.getItem('Wallets');
            return wallets || [];
        } catch (error) {
            console.log(error);
        }
    };

    addWallet = async (walletData) => {
        try {
            const wallets = await AsyncStorage.getItem('Wallets') || [];
            wallets.push(walletData);
            AsyncStorage.setItem('Wallets', wallets);
        } catch (error) {
            console.log(error);
        }
    };

    removeWallet = async (symbol, address) => {
        try {
            const wallets = await AsyncStorage.getItem('Wallets') || [];
            const idx = wallets.findIndex(w => (w.symbol === symbol && w.address === address));
            wallets.splice(idx, 1);
            AsyncStorage.setItem('Wallets', wallets);
        } catch (error) {
            console.log(error);
        }
    }
}