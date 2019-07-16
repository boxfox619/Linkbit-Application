import Cryptr from 'cryptr'
import EthereumWalletManager, { IMPORT_TYPE_PRIVATEKEY } from '../EthereumWalletManager'

describe('EthereumWalletManager', () => {
  jest.setTimeout(300000000)
  const password = '1234'
  const privateKey = 'b520ee36e2c32f9d6643336aabd687e830d29df15ac033bf22cbf5af2b69139a'

  it('create new wallet', async () => {
    const manager = new EthereumWalletManager()
    const wallet = manager.create(password)
    expect(wallet.address).toBeDefined()
    expect(wallet.privateKey).toBeDefined()
  })

  it('wallet import', async () => {
    const manager = new EthereumWalletManager()
    const encrypted = new Cryptr(password).encrypt(privateKey)
    const importData = { privateKey: encrypted, password }
    const importedWallet = manager.import(IMPORT_TYPE_PRIVATEKEY, importData)
    expect(importedWallet).toBeDefined()
  })

  it('load transactions', async () => {
    const manager = new EthereumWalletManager()
    const address = '0xa5B5bE1ecB74696eC27E3CA89E5d940c9dbcCc56'
    const transactions = await manager.loadTransaction(address)
    expect(transactions).toBeDefined()
    expect(transactions.length > 0).toBeTruthy()
  })

  it('get balance', async () => {
    const manager = new EthereumWalletManager()
    const address = '0xa5B5bE1ecB74696eC27E3CA89E5d940c9dbcCc56'
    const balance = await manager.getBalance(address)
    expect(balance).toBeDefined()
    expect(balance > 0).toBeTruthy()
  })

  it('check valid private key', async () => {
    const manager = new EthereumWalletManager()
    const encrypted = new Cryptr(password).encrypt(privateKey)
    expect(manager.checkValidPrivateKey(privateKey)).toBeTruthy()
    expect(!manager.checkValidPrivateKey(encrypted)).toBeTruthy()
    expect(manager.checkValidPrivateKey(encrypted, password)).toBeTruthy()
  })
})