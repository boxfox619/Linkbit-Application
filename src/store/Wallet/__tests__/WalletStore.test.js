import WalletStore from "../WalletStore"
import Web3 from 'web3'

describe("WalletStore", () => {
  it("creates new wallet", async () => {
    const result = await WalletStore.createWallet('ETH', 'test', '12341234')
    expect(result.address).toBeDefined()
    expect(result.privateKey).toBeDefined()
    const importedWallet = await WalletStore.importWallet('ETH', 'test2', 'privateKey', result.privateKey)
    expect(result.address).toMatch(importedWallet.address)
  })
})