import { Localization } from 'expo-localization'
import i18n from 'i18n-js'

const en = {
  wallet: 'WALLET',
  wallet_total: 'Total',
  address_list: 'Own Address List',
  address_list_back: 'Address List',
  add_address: 'Add a new address',
  transaction: 'TRANSACTION',
  setting: 'SETTING',
  lang_mainTxt: 'Language',
  lang_subTxt: 'You can select a language by country',
  lang_en: 'English',
  lang_ko: 'Korean',
  bill_mainTxt: 'Currency',
  bill_subTxt: 'You can set the unit of currency',
  bill_usd: 'USD - US Dollar',
  bill_krw: 'KRW - Korea Won',
  lock_mainTxt: 'Security',
  lock_subTxt: 'You can set up security methods',
  reset_mainTxt: 'Reset',
  reset_subTxt: 'We destroy all accounts and information',
  cancel: 'cancel',
}
const ko = {
  wallet: '지갑',
  wallet_total: '총 자산',
  address_list: '내 주소 관리',
  address_list_back: '내 주소',
  add_address: '주소 등록',
  transaction: '트랜잭션',
  setting: '설정',
  lang_mainTxt: '언어 설정',
  lang_subTxt: '나라별 언어를 선택할 수 있습니다',
  lang_en: '영어',
  lang_ko: '한국어',
  bill_mainTxt: '화폐 단위',
  bill_subTxt: '화폐 단위를 설정할 수 있습니다',
  bill_en: '화폐 단위를 설정할 수 있습니다',
  bill_usd: 'USD - 미국 달러',
  bill_krw: 'KRW - 한국 원',
  lock_mainTxt: '보안 설정',
  lock_subTxt: '보안 방법을 설정할 수 있습니다',
  reset_mainTxt: '초기화',
  reset_subTxt: '모든 계정과 정보를 파기합니다',
  cancel: '취소',
}

i18n.fallbacks = true
i18n.translations = {en, ko}
i18n.locale = Localization.locale

export default i18n
