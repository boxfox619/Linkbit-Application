import Web3 from 'web3'
import Cryptr from 'cryptr'
import { WalletManager } from './WalletManager'
import Transaction from '../../store/Transaction/Transaction'
import moment from 'moment'
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
    address = '0xa5B5bE1ecB74696eC27E3CA89E5d940c9dbcCc56'
    const url = getTransactionApiUrl(address, start, end)
    const res = await fetch(url)
    const data = await res.json()
    return data.transactions.map(tr => tr)
  }

  loadTransaction = async (address, start, end) => {
    const lastBlock = await this.web3.eth.getBlockNumber()
    const transactions = await this.loadTransactionHashList(address, start, end)
    return transactions.map(e => {
      const blockNumber = e.blockNumber
      const txHash = e.hash
      const from = e.from
      const to = e.to
      const date = moment(new Date(e.timestamp * 1000)).format('YYYY-MM-DD hh:mm:ss')
      const amount = this.web3.utils.fromWei(e.value, "ether")
      const confirm = lastBlock - blockNumber
      const status = e.state
      /*
      const nonce = e.nonce
      const blockHash = e.blockHash
      const transactionIndex = e.transactionIndex
      const value = e.value
      const gasPrice = e.gasPrice
      const gas = e.gas
      const input = e.input
      */
      return new Transaction(blockNumber, txHash, 'ETH', from, to, 'undefined', amount, status, date, confirm)
    })
  }
}