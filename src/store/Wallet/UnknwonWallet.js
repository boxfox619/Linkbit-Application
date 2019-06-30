import Wallet from './Wallet'

export default class UnknownWallet extends Wallet {
  constructor(symbol, address) {
    super()
    this.symbol = symbol
    this.address = address
    this.name = 'Unkown'
  }
}