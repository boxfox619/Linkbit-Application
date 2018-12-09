import React from 'react'
import { View, StyleSheet, Text, SafeAreaView, Image, TextInput, Picker } from 'react-native'
import { observer } from 'mobx-react'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import CardSummary from '../../components/CardSummary/CardSummary'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import SegmentedControl from './SegmentedControl/SegmentedControl'
import SearchBar from '../../components/SearchBar/SearchBar'
import AddressBox from './AddressBox/AddressBox'
import AddressInput from './AddressInput/AddressInput'
import AmountInput from './AmountInput/AmountInput'
import AmountBox from './AmountBox/AmountBox'
import FriendBox from './FriendBox/FriendBox'
import RemittanceType from '../../store/RemittanceType'

export default class RemmittanceView extends React.Component {
  state = {
    method: RemittanceType.Wallet,
    step: 1,
    addressTo: '',
    amount: '',
    symbol: '',
  }

  componentDidMount () {

  }

  onMethodChange = index => {
    for (const key in RemittanceType) {
      if (RemittanceType[key] === index) {
        this.setState({method: RemittanceType[key]})
      }
    }

    this.setState({step: 1})
  }

  numberChanged = text => {
    let newText = ''
    const numbers = '0123456789'

    if (text.length < 1)
      this.setState({amount: 0})

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1)
        newText = newText + text[i]

      this.setState({amount: newText})
    }
  }

  postCoin = () => {
    const {step, method, addressTo, amount, symbol} = this.state

    if (method === RemittanceType.Wallet) {
      // go to step 2
      if (step < 2) {
        if (addressTo) {
          this.setState({step: 2})

          return
        }
        else
          alert('Input address is required')
      }

      if (step < 3) {
        // go to step 3
        const value = parseInt(amount)
        if (!isNaN(value) && value > 0) {
          this.setState({step: 3})

          return
        }
        else
          alert('Please input valid amount')
      }
    }
  }

  render () {
    const {method, step, addressTo, amount} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>출금 지갑</Text>
          <CardSummary/>
          {/* <Text style={styles.title}>{'송금 방법'}</Text>
                    <SegmentedControl options={['친구', '지갑']}
                        selectedIndex={method}
                        onChange={this.onMethodChange} /> */}
          {/* Friend */}
          {/*
                        method === RemittanceType.Friend ?
                            <React.Fragment>
                                <Text style={styles.title}>{'친구 목록'}</Text>
                                <SearchBar />
                            </React.Fragment> :
                            null
                    */}
          {/*
                        step >= 2 && method === RemittanceType.Friend ?
                            <React.Fragment>
                                <Text style={styles.title}>{'받는 분'}</Text>
                                <FriendBox mail={'y109384@naver.com'} />
                            </React.Fragment> :
                            null
                    */}
          {/* Wallet */}
          {
            method === RemittanceType.Wallet ? (
                <React.Fragment>
                  <Text style={styles.title}>지갑 주소</Text>
                  <AddressInput
                    address={addressTo}
                    onChangeText={addressTo => this.setState({addressTo})}/>
                </React.Fragment>
              ) :
              null
          }
          {
            step >= 2 && method === RemittanceType.Wallet ? (
                <React.Fragment>
                  <Text style={styles.title}>받는 주소</Text>
                  <AddressBox address={addressTo}/>
                </React.Fragment>
              ) :
              null
          }
          {/* Common */}
          {
            step >= 2 ?
              <Text style={styles.title}>보낼 금액</Text> :
              null
          }
          {
            step === 2 ? (
                <AmountInput
                  data={[['KRW', 'USD']]}
                  value={amount}
                  onChangeText={this.numberChanged}
                  onOptionChange={(selection, row) => this.setState({symbol: data[selection][row]})}/>
              ) :
              null
          }
          {
            step === 3 ?
              <AmountBox/> :
              null
          }
        </View>
        <NavigationButton
          title={step === 3 ? '송금하기' : '다음'}
          onPress={this.postCoin}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  title: {
    color: '#594343',
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%',
    marginHorizontal: 'auto',
    marginTop: 20,
    marginBottom: 5,
  },
})
