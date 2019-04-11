import Web3 from 'web3'
import Cryptr from 'cryptr'
import { WalletManager } from './WalletManager'
import Transaction from '../../store/Transaction/Transaction'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
export const IMPORT_TYPE_PRIVATEKEY = 'privateKey'
export const IMPORT_TYPE_MNEMONIC = 'mnemonic'

const getTransactionApiUrl = (address, start = 0, end = 200) => `https://api.blockchain.info/v2/eth/data/account/${address}/transactions?page=${start}&size=${end}`
export default class EthereumWalletManager extends WalletManager {
  web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/326b0d7561824e0b8c4ee1f30e257019'))

  import = (type, data) => {
    let resultData
    switch (type) {
      case IMPORT_TYPE_PRIVATEKEY:
        let privateKey = data.privateKey
        const password = data.password
        if (password) {
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
    return { address, privateKey: encryptedPrivateKey }
  }

  loadTransactionHashList = async (address, start, end) => {
    //it works only blockchain.com api
    const url = getTransactionApiUrl(address, start, end)
    const res = await fetch(url)
    const data = await res.json()
    return data.transactions.map(tr => tr.hash)
  }

  loadTransaction = (address, start, end) =>
    from(this.loadTransactionHashList(address, start, end)).pipe(
        map(hash => from(this.web3.eth.getTransaction(hash)).pipe(
          map(e => {
            const blockNumber = e.number
            const txHash = e.hash
            const from = e.from
            const to = e.to
            const date = new Date(block.timestamp * 1000).toGMTString()
            const amount = e.value
            const confirm = lastBlock - blockNumber
            const status = confirm > 10
            /*
            const nonce = e.nonce
            const blockHash = e.blockHash
            const transactionIndex = e.transactionIndex
            const value = e.value
            const gasPrice = e.gasPrice
            const gas = e.gas
            const input = e.input
            */
            return new Transaction(txHash, 'ETH', from, to, 'undefined', amount, status, date, confirm)
          })
        )
        )
      ).toPromise()
}