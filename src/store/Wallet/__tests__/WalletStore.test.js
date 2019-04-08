import WalletStore from "../WalletStore"

describe("WalletStore", () => {
  it("creates new wallet", async () => {
    const result = await WalletStore.createWallet('ETH', 'test', '12341234')
    console.log(result)
    expect(result.address).toBeDefined()
    expect(result.privateKey).toBeDefined()
  })
})