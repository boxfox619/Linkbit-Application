import EthereumWalletManager from "../EthereumWalletManager"
import {IMPORT_TYPE_PRIVATEKEY} from '../EthereumWalletManager'

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
        const manager = new EthereumWalletManager()
        const address = '0xa5B5bE1ecB74696eC27E3CA89E5d940c9dbcCc56'
        manager.loadTransaction(address).subscribe(transactions => {
            expect(transactions).toBeDefined()
            expect(transactions.length > 0).toBeTruthy()
        }, err => {
            console.warn(err)
        })
  })
})