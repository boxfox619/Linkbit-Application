import Web3 from 'web3'
export const IMPORT_TYPE_PRIVATEKEY = 'privateKey'
export const IMPORT_TYPE_MNEMONIC = 'mnemonic'

export default class EthereumWalletManager {
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/326b0d7561824e0b8c4ee1f30e257019'))

    import = (type, data) => {
        let resultData
        switch(type) {
            case IMPORT_TYPE_PRIVATEKEY:
                const wallet = this.web3.eth.accounts.privateKeyToAccount(data)
                resultData = {
                    address: wallet.address,
                    privateKey: wallet.privateKey
                }
                break
            case IMPORT_TYPE_MNEMONIC:
                break
        }
        return resultData 
    }

}