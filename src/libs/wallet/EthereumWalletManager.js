import Web3 from 'web3'
import Cryptr from 'cryptr'
import { WalletManager } from './WalletManager'
import Transaction from '../../store/Transaction/Transaction'
import moment from 'moment'
export const IMPORT_TYPE_PRIVATEKEY = 'privateKey'
export const IMPORT_TYPE_MNEMONIC = 'mnemonic'

const web3ProviderUrl = 'https://mainnet.infura.io/v3/326b0d7561824e0b8c4ee1f30e257019'
const getTransactionApiUrl = (address, start = 0, end = 200) => `https://api.blockchain.info/v2/eth/data/account/${address}/transactions?page=${start}&size=${end}`
export default class EthereumWalletManager extends WalletManager {
  web3

  constructor(providerUrl) {
    super();
    const provider = new Web3.providers.HttpProvider(providerUrl || web3ProviderUrl)
    this.web3 = new Web3(provider)
  }

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

  getBalance = async (address) => {
    const balanceWei = await this.web3.eth.getBalance(address)
    const balance = this.web3.utils.fromWei(balanceWei, 'ether')
    return balance
  }

  withdraw = async (privateKey, targetAddress, amount, gasPrice, gasLimit) => {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey)
    const nonce = this.web3.eth.getTransactionCount(web3.eth.defaultAccount)
    const gasPrices = await getCurrentGasPrices()

    const transactionConfig = {
      from: account.address,
      to: targetAddress,
      value: this.web3.toHex(this.web3.toWei(amountToSend, 'ether')),
      gas: 21000,
      gasPrice: gasPrices.low * 1000000000, 
      nonce: nonce,
      chainId: 4 
    }
    const signedTransaction = await account.signTransaction(transactionConfig)
    const transaction = await this.web3.eth.sendSignedTransaction(signedTransaction)
    return transaction.transactionHash
  }

  getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10
    }
    return prices
  }
}