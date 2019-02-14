import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
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

  constructor (props) {
    super(props)
  }

  static get options () {
    return {topBar: {title: {text: '주소 목록'}}}
  }

  render () {
    const {linkedAddressList} = this.props.address
    const linkedAddressSize = linkedAddressList.reduce((count, value) => count + value.accountAddressList.length, 0)

    return (
      <View style={[styles.container, CommonStyle.mainTabViewContent ]}>
        <FlatList
          style={styles.list}
          keyExtractor={(item) => item.linkAddress}
          data={linkedAddressList}
          extraData={linkedAddressSize}
          renderItem={({item}) => {
            return (
              <AddressCard
                address={item.linkAddress}
                linkedAddressCount={item.accountAddressList.length}
                onPress={() => this.props.navigation.navigate({
                  routeName: 'AddressManagement',
                  params: {linkAddress: item.linkAddress},
                })}/>
            )
          }}/>
          <ActionButton buttonColor={PRIMARY_COLOR}
                        onPress={() => this.props.navigation.navigate("AddressBuy")}
                        offsetX={20}
                        offsetY={20} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  list: {
    flex: 1,
  },
})
