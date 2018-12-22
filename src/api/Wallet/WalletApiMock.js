
export default class WalletApiMock {

    fetchWallets = async () => {
      return [
        {
          address: '0x12badgbvgf1q2r1gsagsagf12',
          linkedAddress: 'Linkbit-1123-2314',
          name: '테스트 지갑',
          balance: 123,
          symbol: 'ETH',
        },
        {
          address: '0x12badg123bacsagsagf12',
          linkedAddress: 'Linkbit-1221-3123',
          name: '나의 이더리움 지갑',
          balance: 132,
          symbol: 'ETH',
        },
        {
          address: '0x12badgbvgf1q2r1gs212gf12',
          linkedAddress: 'Linkbit-1123-2314',
          name: '테스트 지갑',
          balance: 123415,
          symbol: 'BTC',
        },
        {
          address: '0x12ba1203212r1gsag112',
          linkedAddress: 'Linkbit-1402-2231',
          name: '테스트 지갑',
          balance: 123415,
          symbol: 'BTC',
        },
      ]
    }

    createWallet = async (symbol, password) => {
      const address = Math.random().toString(36).substring(7)
      const linkAddress = Math.random().toString(36).substring(7)
      
      return await {symbol, balance: 0, address: `0xAavq${address}`, linkedAddress: `Linkbit-${linkAddress}`}
    }

}