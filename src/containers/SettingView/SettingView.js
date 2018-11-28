import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import { Localization } from 'expo-localization'
import i18n from 'i18n-js'
const en = {
  lang_mainTxt: 'Language',
  lang_subTxt: 'You can select a language by country',
  lang_en: 'English',
  lang_ko: 'Korean',
  bill_mainTxt: 'Currency',
  bill_subTxt: 'You can set the unit of currency',
  lock_mainTxt: 'Security',
  lock_subTxt: 'You can set up security methods',
  reset_mainTxt: 'Reset',
  reset_subTxt: 'We destroy all accounts and information'
}
const ko = {
  lang_mainTxt: '언어 설정',
  lang_subTxt: '나라별 언어를 선택할 수 있습니다',
  lang_en: '영어',
  lang_ko: '한국어',
  bill_mainTxt: '화폐 단위',
  bill_subTxt: '화폐 단위를 설정할 수 있습니다',
  lock_mainTxt: '보안 설정',
  lock_subTxt: '보안 방법을 설정할 수 있습니다',
  reset_mainTxt: '초기화',
  reset_subTxt: '모든 계정과 정보를 파기합니다',
}

i18n.fallbacks = true
i18n.translations = { en, ko }
i18n.locale = Localization.locale

const SettingDetailView = (props => {

  const langList = [{
    name: i18n.t('lang_ko', {locale: 'en'}),
    txt: i18n.t('lang_ko'),
  }, {
    name: i18n.t('lang_en', {locale: 'en'}),
    txt: i18n.t('lang_en'),
  }]

  return (
    <View style={styles.container}>
      {
        langList.map((item, idx) =>
          <TouchableOpacity key={idx} style={styles.listItem}>
            <Text>{item.txt}</Text>
          </TouchableOpacity>)
      }
    </View>
  )
})

@observer
export default class SettingView extends React.Component {
  @observable selectedSettingName = 'Setting'

  render () {
    const viewName = `${this.selectedSettingName}View`

    return (
      <View style={styles.container}>
        {
          viewName === 'SettingView' ?
            this.onRenderSettingList() :
            <SettingDetailView
              viewName={viewName}
              onPressSetView={this.onPressSetView}/>
        }
      </View>
    )
  }

  onPressSetView = name => this.selectedSettingName = name

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
      settingList.map((item, idx) =>
        <TouchableOpacity
          key={idx}
          style={styles.listItem}
          onPress={() => this.onPressSetView(item.name)}>
          <Text style={[styles.mainTxt, item.mainTxt === '초기화' && styles.reset]}>{item.mainTxt}</Text>
          <Text style={styles.subTxt}>{item.subTxt}</Text>
        </TouchableOpacity>)
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
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
