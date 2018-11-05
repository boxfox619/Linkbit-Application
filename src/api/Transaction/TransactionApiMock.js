export default class TransactionApiMock {
  fetchTransactions = async (address, page, count) => {
    return [{
      address,

    }];
  }
}