import EthereumWalletManager, { IMPORT_TYPE_PRIVATEKEY } from '../EthereumWalletManager'

describe('EthereumWalletManager', () => {
  jest.setTimeout(300000000)
  const password = '1234'
  const privateKey = '49df76ef7febbe6e883b0754cbd1e1cfaaedba9c0202b231a9124f4adaa5f20408958595fbe81dfaaa38540953a4a35767642794f228c5a48804b71c9019c6d257014f9ce0b2e72e77b57399d64763e97c'

  it('create new wallet and import', async () => {
    const manager = new EthereumWalletManager()
    const wallet = manager.create(password)
    expect(wallet.address).toBeDefined()
    expect(wallet.privateKey).toBeDefined()
  })

  it('create new wallet and import', async () => {
    const manager = new EthereumWalletManager()
    const importData = { privateKey, password }
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
})