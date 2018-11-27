import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Localization } from 'expo-localization'
import i18n from 'i18n-js'
const en = {
  lang_key: 'Language',
  lang_sub: 'You can select a language by country',
  bill_key: 'Currency',
  bill_sub: 'You can set the unit of currency',
  lock_key: 'Security',
  lock_sub: 'You can set up security methods',
  reset_key: 'Reset',
  reset_sub: 'We destroy all accounts and information'
}
const ko = {
  lang_key: '언어 설정',
  lang_sub: '나라별 언어를 선택할 수 있습니다',
  bill_key: '화폐 단위',
  bill_sub: '화폐 단위를 설정할 수 있습니다',
  lock_key: '보안 설정',
  lock_sub: '보안 방법을 설정할 수 있습니다',
  reset_key: '초기화',
  reset_sub: '모든 계정과 정보를 파기합니다',
}

i18n.fallbacks = true;
i18n.translations = { en, ko };
i18n.locale = Localization.locale;
export default class SettingView extends React.Component {
  render () {
    const list = [
      {
        key: i18n.t('lang_key'),
        sub: i18n.t('lang_sub'),
      }, {
        key: '화폐 단위',
        sub: '화폐 단위를 설정할 수 있습니다',
      }, {
        key: '보안 설정',
        sub: '계정 정보를 선택할 수 있습니다',
      }, {
        key: '1:1 문의',
        sub: '운영진에게 문의할 수 있습니다',
      }, {
        key: '신고하기',
        sub: '앱 내에서 문제가 발생할 경우 신고하실 수 있습니다',
      }, {
        key: '초기화',
        sub: '모든 계정과 정보를 파기합니다',
      }]

    return (
      <View style={styles.container}>
        {
          list.map((item, idx)=>
            <TouchableOpacity key={idx} onPress={this.onPress} style={styles.listItem}>
              <Text style={[styles.key, item.key === '초기화' && styles.reset]}>{item.key}</Text>
              <Text style={styles.sub}>{item.sub}</Text>
            </TouchableOpacity>)
        }
      </View>
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
  key: {
    fontSize: 14,
  },
  sub: {
    fontSize: 10,
    color: '#808080',
    textAlign: 'right',
    marginLeft: 'auto',
  },
})
