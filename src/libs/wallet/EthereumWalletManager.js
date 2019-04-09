import Web3 from 'web3'
import Cryptr from 'cryptr'
export const IMPORT_TYPE_PRIVATEKEY = 'privateKey'
export const IMPORT_TYPE_MNEMONIC = 'mnemonic'

export default class EthereumWalletManager {
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/326b0d7561824e0b8c4ee1f30e257019'))

    import = (type, data) => {
        let resultData
        switch(type) {
            case IMPORT_TYPE_PRIVATEKEY:
                let privateKey = data.privateKey
                const password  = data.password
                if(password){
                    privateKey = new Cryptr(password).decrypt(privateKey)
                }
                const wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey)
                resultData = {
                    address: wallet.address,
                    privateKey: wallet.privateKey
                }
                break
            case IMPORT_TYPE_MNEMONIC:
                //@TODO implement mnemonic import
                break
        }
        return resultData 
    }

    create = (password) => {
        const walletData = this.web3.eth.accounts.create()
        const address = walletData.address
        const privateKey = walletData.privateKey
        const cryptr = new Cryptr(password)
        const encryptedPrivateKey = cryptr.encrypt(privateKey)
        return {address, privateKey: encryptedPrivateKey}
    }
}