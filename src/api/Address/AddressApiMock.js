export default class AddressApiMock {

  fetchOwnAddressList = async () => {

  }
  registerAddress = async (linkedAddress, accountAddress) => {
    return {status: true};
  }
}