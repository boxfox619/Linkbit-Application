import React from 'react'
import { StyleSheet, Alert, View, TouchableOpacity, Text } from 'react-native'
import i18n from '../../libs/Locale'
import { UserStore } from '../../store'
import { SecurityView } from '..'

const SettingTouchableView = (props => {
  const { viewName, onSetView, updateSetting } = props
  const list = {
    LanguageView: [{
      txt: i18n.t('lang_ko'),
      val: 'ko',
    }, {
      txt: i18n.t('lang_en'),
      val: 'en',
    }],
    CurrencyView: [
      {
        txt: i18n.t('bill_krw'),
        val: 'KRW',
      }, {
        txt: i18n.t('bill_usd'),
        val: 'USD',
      }],
  }

  const handleSettingDetail = val => {
    const name = viewName === 'LanguageView' ? 'language' : 'currency'
    if (name === 'language') i18n.locale = val

    updateSetting(name, val)
    onSetView('Setting')
  }

  return (
    <View style={styles.container}>
      {
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

  constructor (props) {
    super(props)
    this.store = new UserStore()
    this.state = {
      view: 'Setting',
    }
  }

  handleSetView = name => this.setState({view: name})

  onRenderSettingList = () => {
    const settingList = [
      {
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
          <Text style={[styles.mainTxt, item.mainTxt === i18n.t('reset_mainTxt') && styles.reset]}>{item.mainTxt}</Text>
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
            this.onRenderSettingList() :
            viewName === 'SecurityView' ?
              <SecurityView
                getFingerPrint={this.store.getFingerPrint}
                updateSetting={(name, val) => this.store.updateSetting(name, val)}/> :
              viewName === 'ResetView' ?
                Alert.alert(
                  i18n.t('reset_mainTxt'),
                  i18n.t('reset_subTxt'),
                  [
                    {text: i18n.t('cancel'), onPress: () => this.handleSetView('Setting'), style: 'cancel'},
                    {text: i18n.t('reset_mainTxt').toLowerCase(), onPress: () => this.handleSetView('Setting')},
                  ],
                  {cancelable: false},
                ) : (
                  <SettingTouchableView
                    viewName={viewName}
                    onSetView={this.handleSetView}
                    updateSetting={(name, val) => this.store.updateSetting(name, val)}/>
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
