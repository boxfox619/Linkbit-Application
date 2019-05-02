import React from 'react'
import {View, Button, StyleSheet, Dimensions, ScrollView, Text} from 'react-native'
import i18n from '../libs/Locale'

export default class TermsOfServiceView extends React.Component {
  onPressConfirm = () => {

  }

  /*
Linkbit는 프라이빗 키를 비롯한 사용자 정보를 안전하게 암호화하여 기기에 저장하며, 중앙 서버에 이를 보관하지 않아 해킹의 위협이 없습니다.
{'\n\n'}
Linkbit 이용약관
{' '}
{'\n'}
제 1장 총칙
{' '}
{'\n'}
[제 1조(목적)]
{' '}
{'\n'}
이 약관은 Linkbit(이하 “회사”라 함)가 운영하는 “Linkbit” 웹 서비스와 스마트폰 등 이동통신기기를 통해 제공되는 모바일 애플리케이션을 통해서 전자상거래 관련 서비스 및 기타
서비스(이하 “서비스”라 함)를 이용하는 자간의 권리, 의무를 확정하고 이를 이행함으로써 상호발전을 도모하는 것을 그 목적으로 합니다.
{'\n'}
{' '}
{'\n'}
[제 2조(약관의 명시, 효력과 개정)]
{' '}
{'\n'}
1. 회사는 이 약관의 내용은 회사의 서비스 회원가입관련 사이트에 게시하거나 기타의 방법으로 사용자에게 공지하고, 이용자가 회원으로 가입하면서 이 약관에 동의함으로써 효력이 발생합니다.
{'\n'}
{' '}
{'\n'}
2. 회사는 “약관의 규제에 관한 법률”, “정보통신망 이용촉진 및 정보보호 등에 관한 법률” 등 관련법을 위배하지 않은 범위에서 본 약관을 개정할 수 있습니다.
{'\n'}
{' '}
{'\n'}
3. 회사가 약관을 개정할 경우에는 적응일자 및 개정사유를 명시하여 현행약관과 함께 회사 사이트의 초기화면이나 팝업화면 또는 공지사항란에 그 적용일자 7일 이전부터 적용일자 전일까지
공지합니다.
{'\n'}
{' '}
{'\n'}
4. 회사가 전항에 따라 개정약관을 공지 통지하면서 회원에게 7일간의 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 고지 또는 통지하였음에도 회원이
명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 개정약관에 동의한 것으로 봅니다.
  * */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <ScrollView>
            <Text style={{paddingVertical: 10, paddingHorizontal: 10}}>{i18n.t('terms')}</Text>
          </ScrollView>
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.onPressConfirm}
            title={i18n.t('agree')}
            color="#594343"/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  contents: {
    width: Dimensions.get('window').width/100*80,
    height: Dimensions.get('window').height/100*80,
    marginBottom: 20,
    borderColor: '#e8a93a',
    borderWidth: 2,
    borderRadius: 12,
  },
})
