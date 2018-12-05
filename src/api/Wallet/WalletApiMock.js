
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
          address: '0x12badgbvgf1q2r1gsagsagf12',
          linkedAddress: 'Linkbit-1123-2314',
          name: '테스트 지갑',
          balance: 123415,
          symbol: 'BTC',
        },
      ]
    }

}