import ethereumIcon from '../assets/ETH.png'

const HOST = 'https://ive2y3tdlh.execute-api.ap-northeast-2.amazonaws.com/dev'
const COIN_API_HOST = 'https://api.coingecko.com/api/v3'
const PRIMARY_COLOR = '#594343'
const RUNNING_MODE = 'test'
const INFURA_MAINNET_URL = 'https://mainnet.infura.io/v3/326b0d7561824e0b8c4ee1f30e257019'

const COIN_INFO = [
  {
    symbol: 'ETH',
    name: 'ethereum',
    themeColor: '#627eea',
    icon: ethereumIcon,
  },
]
export {
  HOST,
  PRIMARY_COLOR,
  RUNNING_MODE,
  COIN_API_HOST,
  INFURA_MAINNET_URL,
  COIN_INFO,
}
