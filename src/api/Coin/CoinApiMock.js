
export default class CoinApiMock {
    fetchCoinPrices = async (symbols) => {
      return await symbols.map(symbol => {
        switch(symbol){
        case 'ETH':
          return {symbol, name: '이더리움', price: 240000}
        case 'BTC':
          return {symbol, name: '비트코인', price: 7400000}
        }
      })
    }
}