import { observable, action, computed } from 'mobx'
import { debounce } from 'lodash'
import WalletStore from './Wallet/WalletStore'
import CoinPriceStore from './CoinPriceStore'
import * as AddressApi from '../api/Address/AddressNetworkApi'
import walletManager from '../libs/wallet'

export default class WithdrawStore {
  @observable symbol
  @observable sourceAddress
  @observable destAddress
  @observable amount = 0
  @observable price = 0
  @observable moneySymbol
  @observable destAddressError
  @observable password
  transactionStore

  constructor(transactionStore) {
    this.transactionStore = transactionStore
  }

  setSourceWallet = action((symbol, address) => {
    this.symbol = symbol
    this.sourceAddress = address
  })

  setTargetAddress = action((address) => {
    this.destAddress = address

    if (address.length === 0) {
      this.destAddressError = 'Please enter dest address'

      return
    }
    if (address === this.sourceAddress) {
      this.destAddressError = 'source address & target address is same'

      return
    }
    this.checkAddressValidDebounce()
  })

  checkAddressValid = async () => {
    try {
      const destAddress = await this.getDestAddress()
      if (!destAddress) {
        this.destAddressError = 'Please enter valid address'
      } else {
        this.destAddressError = undefined
      }
    } catch (err) {
      this.destAddressError = 'Please enter valid address'
    }
  }

  getDestAddress = async () => {
    if (this.destAddress.length === 0) return
    if (this.walletManager.validAddress(this.destAddress)) {
      return this.destAddress
    }

    return await AddressApi.getAccountAddress(this.destAddress, this.symbol)
  }

  checkAddressValidDebounce = debounce(this.checkAddressValid, 800)

  setAmount = action((amount) => {
    this.amount = amount
    this.price = this.coinPrice * amount
  })

  setMoneySymbol = action((symbol) => {
    this.moneySymbol = symbol
  })

  setPrice = action((price) => {
    this.price = price
    this.amount = price / this.coinPrice
  })

  setPassword = action((password) => {
    this.password = password
  })

  @computed get coinPrice() {
    return CoinPriceStore.getCoin(this.symbol).price
  }

  @computed get amountError() {
    const value = parseFloat(this.amount)
    if (isNaN(value) || value <= 0) {
      return 'Please enter valid amount'
    }
    if (value > this.wallet.balance) {
      return `Up to a maximum of ${this.wallet.balance} can be sent.`
    }
    
    return undefined
  }

  @computed get wallet() {
    return WalletStore.walletList.find(w => w.address === this.sourceAddress || w.linkedAddress === this.sourceAddress)
  }

  @computed get passwordRequired() {
    // @TODO impl password check
    return false
  }

  get walletManager() {
    return walletManager[this.symbol]
  }

  withdraw = async () => {
    const destAddress = await this.getDestAddress()
    await this.walletManager.withdraw(this.wallet.privateKey, destAddress, this.amount)
    /*    
          
          const transactionData = {
          block: 0,
          hash: transactionHash,
          symbol: this.symbol,
          sourceAddress: this.sourceAddress,
          targetAddress: destAddress,
          amount: this.amount,
          status: false,
          date: new Date().toDateString(),
          confirm: 0
      } */
    await this.transactionStore.refreshTransactions()
    await WalletStore.loadAllBalance()
  }

  get symbol() {
    return this.symbol
  }

  get amount() {
    return this.amount
  }

  get address() {
    return this.destAddress
  }

}