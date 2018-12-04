export default class TransactionApiMock {
    fetchTransactions = async (address, page, count) => {
        let list = []
        for (let i = 0; i < count; i++) {
            list.push({
                email: 'abc@vw.xyz',
                address: '0xasd1231fdva1231vas',
                coin: 11.23,
                symbol: 'ETH',
                confirm: 91,
                date: '2018-11-11'
            })
    }
    return list;
  }
}