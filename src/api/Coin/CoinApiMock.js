import {HOST} from '../../libs/Constraints'

export default class CoinApiMock {
    fetchCoins = async (symbols) => {
      return await symbols.map(symbol => COINS.find(c => c.symbol === symbol))
    }

}

const COINS = [
    {
        icon: `${HOST}/assets/BTC.png`,
        name: '비트코인',
        symbol: 'BTC',
        themeColor: '#F7931A',
        price: 240000
    },
    {
        icon: `${HOST}/assets/XRP.png`,
        name: '리플',
        symbol: 'XRP',
        themeColor: '#23292F',
        price: 240
    },
    {
        icon: `${HOST}/assets/ETC.png`,
        name: '이더리움',
        symbol: 'ETH',
        themeColor: '#627EEA',
        price: 2999,
        subCoins: [{
            icon: `${HOST}/assets/EBC.png`,
            name: '이비코인',
            symbol: 'EBC',
            themeColor: '#1693D4',
            price: 2213
        }, {
            icon: `${HOST}/assets/KNC.png`,
            name: '카이버',
            symbol: 'KNC',
            themeColor: '#188C92',
            price: 2213
        }]
    },
    {
        icon: `${HOST}/assets/XMR.png`,
        name: '모네로',
        symbol: 'XMR',
        themeColor: '#FF6600',
        price: 2213
    },
    {
        icon: `${HOST}/assets/PPC.png`,
        name: '피어코인',
        symbol: 'PPC',
        themeColor: '#3CB054',
        price: 240310
    },
    {
        icon: `${HOST}/assets/DASH.png`,
        name: '대쉬',
        symbol: 'DASH',
        themeColor: '#008CE7',
        price: 2213
    },
    {
        icon: `${HOST}/assets/ETC.png`,
        name: '이더리움 클래식',
        symbol: 'ETC',
        themeColor: '#328332',
        price: 2213
    }
];