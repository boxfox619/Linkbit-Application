const ic_btc = require('../../assets/ic_btc.png')
const ic_dash = require('../../assets/ic_dash.png')
const ic_etc = require('../../assets/ic_etc.png')
const ic_eth = require('../../assets/ic_eth.png')
const ic_ppc = require('../../assets/ic_ppc.png')
const ic_xmr = require('../../assets/ic_xmr.png')
const ic_xrp = require('../../assets/ic_xrp.png')
const ic_ebc = require('../../assets/ic_ebc.png')
const ic_knc = require('../../assets/ic_knc.png')

export const coins = [{
    icon: ic_btc,
    name: '비트코인',
    symbol: 'BTC',
    themeColor: '#F7931A'
},
{
    icon: ic_xrp,
    name: '리플',
    symbol: 'XRP',
    themeColor: '#23292F'
},
{
    icon: ic_eth,
    name: '이더리움',
    symbol: 'ETH',
    themeColor: '#627EEA',
    subCoins: [{
        icon: ic_ebc,
        name: '이비코인',
        symbol: 'EBC',
        themeColor: '#1693D4'
    }, {
        icon: ic_knc,
        name: '카이버',
        symbol: 'KNC',
        themeColor: '#188C92'
    }]
},
{
    icon: ic_xmr,
    name: '모네로',
    symbol: 'XMR',
    themeColor: '#FF6600'
},
{
    icon: ic_ppc,
    name: '피어코인',
    symbol: 'PPC',
    themeColor: '#3CB054'
},
{
    icon: ic_dash,
    name: '대쉬',
    symbol: 'DASH',
    themeColor: '#008CE7'
},
{
    icon: ic_etc,
    name: '이더리움 클래식',
    symbol: 'ETC',
    themeColor: '#328332'
},]