import React from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'
import { inject, observer } from 'mobx-react/index'
import { observable } from 'mobx'
import { PRIMARY_COLOR } from '../../libs/Constraints'
import i18n from '../../libs/Locale'
import AddressCard from '../../components/Card/AddressCard'
import ActionButton from "react-native-action-button";
import CommonStyle from "../../libs/CommonStyle";

@inject(['address'])
@observer
export default class AddressListView extends React.Component {
  @observable selectedAddress = undefined

  constructor(props) {
    super(props)
  }

  static get options() {
    return { topBar: { title: { text: i18n.t('address_list') } } }
  }

  render() {
    const { linkedAddressList } = this.props.address
    const linkedAddressSize = linkedAddressList.reduce((count, value) => count + value.accountAddressList.length, 0)

    return (
      <View style={[styles.container, CommonStyle.mainTabViewContent]}>
        <FlatList
          style={styles.list}
          keyExtractor={(item) => item.linkAddress}
          data={linkedAddressList}
          extraData={linkedAddressSize}
          renderItem={({ item }) => {
            return (
              <AddressCard
                address={item.linkAddress}
                linkedAddressCount={item.accountAddressList.length}
                onPress={() => this.props.navigation.navigate({
                  routeName: 'AddressManagement',
                  params: { linkAddress: item.linkAddress },
                })}
                onLongPress={() => this.handler(item)} />
            )
          }} />
        <ActionButton
          buttonColor={PRIMARY_COLOR}
          onPress={() => this.props.navigation.navigate("AddressBuy")}
          offsetX={20}
          offsetY={20} />
      </View>
    )
  }

  handler = (linkaddress) => {
    Alert.alert(
      i18n.t('delete_address'),
      i18n.t('confirm_delete_address'),
      [
        { text: i18n.t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: i18n.t('agree'), onPress: () => this.deleteAddress(linkaddress) },
      ],
      { cancelable: false },
    )
  }

  deleteAddress = (linkaddress) => {
    linkaddress.deleteAddress().then(res => {
      if (res) {
        this.props.navigation.goBack(null)
      } else {
        alert(i18n.t('fail_delete_address'))
      }
    }).catch(err => alert(err))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    flex: 1,
  },
})
