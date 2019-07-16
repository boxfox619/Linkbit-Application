import Web3 from 'web3'
import Cryptr from 'cryptr'
import moment from 'moment'
import axios from 'axios'
import { Observable } from 'rxjs'
import EthWallet from 'ethereumjs-wallet'
import { Transaction as EthereumTx } from 'ethereumjs-tx'
import Units from 'ethereumjs-units'
import WalletManager from './WalletManager'
import Transaction from '../../store/Transaction/Transaction'
import { INFURA_MAINNET_URL } from '../Constraints'

export const IMPORT_TYPE_PRIVATEKEY = 'privateKey'
export const IMPORT_TYPE_MNEMONIC = 'mnemonic'

const web3ProviderUrl = 'https://mainnet.infura.io/v3/326b0d7561824e0b8c4ee1f30e257019'
const getTransactionApiUrl = (address, start = 0, end = 200) => `https://api.blockchain.info/v2/eth/data/account/${address}/transactions?page=${start}&size=${end}`
export default class EthereumWalletManager extends WalletManager {
  web3

  constructor(providerUrl) {
    super()
    const provider = new Web3.providers.HttpProvider(providerUrl || web3ProviderUrl)
    this.web3 = new Web3(provider)
  }

  import = async (type, data) => {
    let resultData
    if (type === IMPORT_TYPE_PRIVATEKEY) {
      const password = data.password
      let privateKey = data.privateKey
      if (password) {
        privateKey = new Cryptr(password).decrypt(privateKey)
      }
      const wallet = EthWallet.fromPrivateKey(Buffer.from(privateKey, 'hex'))
      resultData = {
        address: wallet.getAddressString(),
        privateKey: data.privateKey,
      }
    } else if (type === IMPORT_TYPE_MNEMONIC) {
      // @TODO implement mnemonic
    }

    return resultData
  }

  create = (password) => {
    const walletData = EthWallet.generate()
    const privateKey = walletData.getPrivateKey().toString('hex')
    const address = walletData.getAddressString()
    const cryptr = new Cryptr(password)
    const encryptedPrivateKey = cryptr.encrypt(privateKey)

    return { address, privateKey: encryptedPrivateKey }
  }

  loadTransactionHashList = async (address, start, end) => {
    //it works only blockchain.com api
    const url = getTransactionApiUrl(address, start, end)
    const res = await axios.get(url)
    const data = await res.data

    return data.transactions.map(tr => tr)
  }

  loadTransaction = async (address, start, end) => {
    const res = await axios.post(INFURA_MAINNET_URL, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    })
    const lastBlock = parseInt(res.data.result, 16)
    const transactions = await this.loadTransactionHashList(address, start, end)

    return transactions.map(e => {
      const blockNumber = e.blockNumber
      const txHash = e.hash
      const from = e.from
      const to = e.to
      const date = moment(new Date(e.timestamp * 1000)).format('YYYY-MM-DD hh:mm:ss')
      const amount = Units.convert(e.value, 'wei', 'eth')
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

  getBalance = async (address) => Observable.create(async (obs) => {
    const res = await axios.post(INFURA_MAINNET_URL, {
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [address, 'latest'],
      id: 1,
    })
    const value = parseInt(res.data.result, 16)
    const balance = Units.convert(value, 'wei', 'eth')
    obs.next(balance)
    obs.complete()
  }).toPromise()

  withdraw = async (privateKey, password, targetAddress, amount) => {
    const gasPrices = await this.getCurrentGasPrices()
    const privateKeyString = password ? new Cryptr(password).decrypt(privateKey) : privateKey
    const privateKeyBuffer = Buffer.from(privateKeyString, 'hex')

    const transactionConfig = {
      to: targetAddress,
      value: this.web3.utils.toHex(this.web3.utils.toWei(amount, 'ether')),
      gas: 21000,
      gasPrice: gasPrices.low * 1000000000,
      chainId: 0,
    }
    const tx = new EthereumTx(transactionConfig)
    tx.sign(privateKeyBuffer)
    const rawTrnasaction = tx.serialize().toString('hex')
    const res = await axios.post(INFURA_MAINNET_URL, {
      jsonrpc: '2.0',
      method: 'eth_sendRawTransaction',
      params: [rawTrnasaction],
      id: 1,
    })
    const txHash = res.data.result

    return txHash
  }

  getCurrentGasPrices = async () => {
    const res = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    const data = res.data
    const prices = {
      low: data.safeLow / 10,
      medium: data.average / 10,
      high: data.fast / 10,
    }

    return prices
  }

  validAddress = (address) => this.web3.utils.isAddress(address)

  checkValidPrivateKey = (privateKey, password) => {
    try {
      const privateKeyString = password ? new Cryptr(password).decrypt(privateKey) : privateKey
      const wallet = EthWallet.fromPrivateKey(Buffer.from(privateKeyString, 'hex'))
      
      return !!wallet
    } catch {
      return false
    }
  }
}