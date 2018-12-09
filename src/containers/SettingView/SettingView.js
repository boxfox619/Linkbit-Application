import React from 'react'
import { StyleSheet, Alert, View, TouchableOpacity, Text } from 'react-native'
import i18n from '../../libs/Locale'
import { SecurityView } from '..'

const SettingDetailView = (props => {
  const { viewName, onSetView } = props
  const list = {
    LanguageView: [{
      txt: i18n.t('lang_ko'),
      val: 'en',
    }, {
      txt: i18n.t('lang_en'),
      val: 'ko',
    }],
    CurrencyView: [{
      txt: i18n.t('bill_krw'),
      val: 'KRW',
    }, {
      txt: i18n.t('bill_usd'),
      val: 'USD',
    }],
  }

  const handleSettingDetail = val => {
    if(viewName === 'LanguageView') i18n.locale = val

    onSetView('Setting')
  }

  return (
    <View style={styles.container}>
      {
        (viewName === 'SecurityView' && <SecurityView />) ||
        (viewName === 'ResetView' && Alert.alert(
          '초기화',
          '모든 계정과 정보를 파기합니다.',
          [
            {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '초기화', onPress: handleSettingDetail},
          ],
          { cancelable: false },
        )) ||
        list[viewName].map(item => (
          <TouchableOpacity
            key={item.txt}
            style={styles.listItem}
            onPress={() => handleSettingDetail(item.val)}>
            <Text>{item.txt}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
})

export default class SettingView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      view: 'Setting',
    }
  }

  handleSetView = name => this.setState({ view: name })

  onRenderSettingList = () => {
    const settingList = [{
      name: i18n.t('lang_mainTxt', {locale: 'en'}),
      mainTxt: i18n.t('lang_mainTxt'),
      subTxt: i18n.t('lang_subTxt'),
    }, {
      name: i18n.t('bill_mainTxt', {locale: 'en'}),
      mainTxt: i18n.t('bill_mainTxt'),
      subTxt: i18n.t('bill_subTxt'),
    }, {
      name: i18n.t('lock_mainTxt', {locale: 'en'}),
      mainTxt: i18n.t('lock_mainTxt'),
      subTxt: i18n.t('lock_subTxt'),
    }, {
      name: i18n.t('reset_mainTxt', {locale: 'en'}),
      mainTxt: i18n.t('reset_mainTxt'),
      subTxt: i18n.t('reset_subTxt'),
    }]

    return (
      settingList.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.listItem}
          onPress={() => this.handleSetView(item.name)}>
          <Text style={[styles.mainTxt, item.mainTxt === '초기화' && styles.reset]}>{item.mainTxt}</Text>
          <Text style={styles.subTxt}>{item.subTxt}</Text>
        </TouchableOpacity>
      ))
    )
  }

  render () {
    const viewName = `${this.state.view}View`

    return (
      <View style={styles.container}>
        {
          viewName === 'SettingView' ?
            this.onRenderSettingList() : (
              <SettingDetailView
                viewName={viewName}
                onSetView={this.handleSetView} />
            )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  reset: {
    color: '#ff6767',
  },
  mainTxt: {
    fontSize: 14,
  },
  subTxt: {
    fontSize: 10,
    color: '#808080',
    textAlign: 'right',
    marginLeft: 'auto',
  },
})
