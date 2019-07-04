import WalletStore from '../WalletStore'

describe('WalletStore', () => {
  it('creates new wallet', async () => {
    const symbol = 'ETH'
    const password = '12341234'
    const result = await WalletStore.createWallet(symbol, password)
    expect(result.address).toBeDefined()
    expect(result.privateKey).toBeDefined()
    const importData = {privateKey: result.privateKey, password}
    const importedWallet = await WalletStore.importWallet(symbol, 'test2', 'privateKey', importData)
    expect(result.address).toMatch(importedWallet.address)
  })
})