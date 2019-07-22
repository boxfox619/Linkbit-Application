import Web3 from 'web3'
import {INFURA_MAINNET_URL} from './Constraints'

const config = {
  url : INFURA_MAINNET_URL,
}
const createWeb3 = () => new Web3(new Web3.providers.HttpProvider(config.url))
exports.createWeb3 = createWeb3
exports.config = config
export default createWeb3