import { createStore } from '../..'

describe('WalletStore', () => {
  const store = createStore()
  it('creates new wallet', async () => {
    const symbol = 'ETH'
    const password = '12341234'
    const result = await store.wallet.createWallet(symbol, password)
    expect(result.address).toBeDefined()
    expect(result.privateKey).toBeDefined()
    const importData = {privateKey: result.privateKey, password}
    const importedWallet = await store.wallet.importWallet(symbol, 'test2', 'privateKey', importData)
    expect(result.address).toMatch(importedWallet.address)
  })
})