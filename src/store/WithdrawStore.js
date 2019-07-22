import { observable, action, computed } from 'mobx'
import { debounce } from 'lodash'
import * as AddressApi from '../api/Address/AddressNetworkApi'
import walletManager from '../libs/wallet'
import { handleError } from '../libs/ErrorHandler'
import i18n from '../libs/Locale'

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
  coinPriceStore
  walletStore

  constructor(coinPriceStore, walletStore, transactionStore) {
    this.transactionStore = transactionStore
    this.coinPriceStore = coinPriceStore
    this.walletStore = walletStore
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
    return this.coinPriceStore.getCoin(this.symbol).price
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
    return this.walletStore.wallets.find(w => w.address === this.sourceAddress || w.linkedAddress === this.sourceAddress)
  }

  @computed get passwordRequired() {
    return !this.walletManager.checkValidPrivateKey(this.wallet.privateKey, this.password)
  }

  get walletManager() {
    return walletManager[this.symbol]
  }

  withdraw = async () => {
    if (!this.walletManager.checkValidPrivateKey(this.wallet.privateKey, this.password)) {
      throw new Error(i18n.t('wrong_password'))
    }
    try {
      const destAddress = await this.getDestAddress()
      await this.walletManager.withdraw(this.wallet.privateKey, this.password, destAddress, this.amount)
    } catch (err) {
      handleError(err)
      throw new Error(i18n.t('withdraw_failed'))
    }
    try {
      await this.transactionStore.refreshTransactions()
      await this.walletStore.loadAllBalance()
    } catch (err) {
      handleError(err)
    }
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