import {AsyncStorage, fetch} from 'react-native';
import {HOST} from "../../libs/Constraints";

export default class WalletStorageApi {

    createWallet = async (symbol, password) => {
        try {
            const res = await await fetch(`${HOST}/wallet`, {
                method: 'POST',
                headers: {
                    'Authorization': '',
                },
                body: JSON.stringify({
                    symbol,
                    password
                }),
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

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