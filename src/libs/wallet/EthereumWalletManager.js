import Web3 from 'web3'
import Cryptr from 'cryptr'
import {WalletManager} from './WalletManager'
import Transaction from '../../store/Transaction/Transaction'
export const IMPORT_TYPE_PRIVATEKEY = 'privateKey'
export const IMPORT_TYPE_MNEMONIC = 'mnemonic'

export default class EthereumWalletManager extends WalletManager{
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

    loadTransaction = async (address, startBlockNumber, endBlockNumber) => {
        const transactions = []
        const lastBlock = await this.web3.eth.getBlockNumber()
        if (endBlockNumber == null) {
            endBlockNumber =  lastBlock
          }
          if (startBlockNumber == null) {
            startBlockNumber = endBlockNumber - 1000;
          }
        
          for (var i = startBlockNumber; i <= endBlockNumber; i++) {
            var block = await this.web3.eth.getBlock(i, true);
            if (block != null && block.transactions != null) {
              block.transactions.forEach( function(e) {
                if (address == e.from || address == e.to) {
                    const blockNumber = e.number
                    const txHash = e.hash
                    const from = e.from
                    const to = e.to
                    const date = new Date(block.timestamp * 1000).toGMTString()
                    const amount = e.value
                    const confirm = lastBlock - blockNumber
                    const status = confirm > 10
                    const transaction = new Transaction(txHash, 'ETH', from, to, 'undefined', amount, status, date, confirm)
                    transactions.push(transaction.asJson)
                    /*
                    const nonce = e.nonce
                    const blockHash = e.blockHash
                    const transactionIndex = e.transactionIndex
                    const value = e.value
                    const gasPrice = e.gasPrice
                    const gas = e.gas
                    const input = e.input
                    */
                }
              })
            }
          }
        return transactions
    }
}