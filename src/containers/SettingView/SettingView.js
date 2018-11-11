import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native'

export default class SettingView extends React.Component {
  render () {
    const list = [
      {
        key: '언어 설정',
        sub: '나라별 언어를 선택할 수 있습니다',
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
