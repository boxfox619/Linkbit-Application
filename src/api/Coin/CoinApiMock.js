
export default class CoinApiMock {
    fetchCoinSymbols = async () =>{
      return await COINS
    }

    fetchCoins = async (symbols) => {
      return await symbols.map(symbol => COINS.find(c => c.symbol === symbol))
    }

}

const COINS = [
  {
    name: '비트코인',
    symbol: 'BTC',
    themeColor: '#F7931A',
    price: 240000,
  },
  {
    name: '리플',
    symbol: 'XRP',
    themeColor: '#23292F',
    price: 240,
  },
  {
    name: '이오스',
    symbol: 'EOS',
    themeColor: '#232b2F',
    price: 240,
  },
  {
    name: '이더리움',
    symbol: 'ETH',
    themeColor: '#627EEA',
    price: 2999,
    subCoins: [{
      name: '이비코인',
      symbol: 'EBC',
      themeColor: '#1693D4',
      price: 2213,
    }, {
      name: '카이버',
      symbol: 'KNC',
      themeColor: '#188C92',
      price: 2213,
    }],
  },
  {
    name: '모네로',
    symbol: 'XMR',
    themeColor: '#FF6600',
    price: 2213,
  },
  {
    name: '피어코인',
    symbol: 'PPC',
    themeColor: '#3CB054',
    price: 240310,
  },
  {
    name: '대쉬',
    symbol: 'DASH',
    themeColor: '#008CE7',
    price: 2213,
  },
  {
    name: '이더리움 클래식',
    symbol: 'ETC',
    themeColor: '#328332',
    price: 2213,
  },
]