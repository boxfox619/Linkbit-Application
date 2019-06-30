import React from 'react'
import { WebView } from 'react-native-webview'

const TransactionDetailView = ({navigation}) => {
    const txHash = navigation.getParam('txHash', '')
    return (<WebView source={{ uri: `https://etherscan.io/tx/${txHash}` }} />)
}
export default TransactionDetailView