export default class AddressApiMock {

    fetchOwnAddressList = async () => {
        return [{
            address: 'Linkbit-1234-1234',
            accountAddressList: [
                {symbol: 'ETH', address: '0x12asbvadgsgq2wr1231'},
                {symbol: 'BTC', address: '0x12rsAGVAasfdqw123'}
            ]
        }, {
            address: 'Linkbit-12134-12324',
            accountAddressList: [
                {symbol: 'ETH', address: '0x12asbabvadgsgq2wr1231'},
                {symbol: 'BTC', address: '0x12rsAGVA2w1asfdqw123'}
            ]
        }, {
            address: 'Linkbit-124-124',
            accountAddressList: []
        }
        ];
    };
    registerAddress = async (linkedAddress, accountAddress) => {
        return {status: true};
    }
}