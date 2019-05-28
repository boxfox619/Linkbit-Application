import EthereumWalletManager from "../EthereumWalletManager"
import {IMPORT_TYPE_PRIVATEKEY} from '../EthereumWalletManager'
import http from 'http'

describe("EthereumWalletManager", () => {
    jest.setTimeout(300000000);
  it("create new wallet and import", async () => {
        const manager = new EthereumWalletManager()
        const password = '1234'
        const wallet = manager.create(password)
        const importData = {privateKey: wallet.privateKey, password}
        const importedWallet = manager.import(IMPORT_TYPE_PRIVATEKEY, importData)
        expect(wallet.address).toBeDefined()
        expect(wallet.privateKey).toBeDefined()
        expect(wallet.address).toMatch(importedWallet.address)
  })

  it("load transactions", async () => {
    global.fetch = async (url) => ({json: async () => ({
      "transactions": [{
        "hash": "0xa42bf1e44825ae06baac6f6aebb25b1b97872ce0ea1462e60cba83864d5ec2d2",
        "blockHash": "0xacff1f32e0cd7eb52e18bdbdca4dc8a27bb835ae53b413849124063d0fc35511",
        "blockNumber": "7687778",
        "to": "0x910214987f1c976b2749b0f51c3073850512b967",
        "from": "0xa5b5be1ecb74696ec27e3ca89e5d940c9dbccc56",
        "value": "1000000",
        "nonce": "24",
        "gasPrice": "3000000000",
        "gasLimit": "21000",
        "gasUsed": "21000",
        "transactionIndex": "89",
        "success": true,
        "state": "CONFIRMED",
        "timestamp": "1556882979",
        "internalTransactions": []
      }]})})
        const manager = new EthereumWalletManager()
        const address = '0xa5B5bE1ecB74696eC27E3CA89E5d940c9dbcCc56'
        const transactions = await manager.loadTransaction(address)
        expect(transactions).toBeDefined()
        expect(transactions.length > 0).toBeTruthy()
  })

  it("withdraw test", async () => {
    const manager = new EthereumWalletManager()
  })
})