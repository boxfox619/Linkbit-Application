import { Localization } from 'expo-localization'
import i18n from 'i18n-js'

const en = {
  wallet: 'WALLET',
  wallet_total: 'Total',
  address_list: 'Own Address List',
  address_list_back: 'Address List',
  add_address: 'Add a address',
  add_wallet: 'Add a wallet',
  wallet_search: 'Search wallet name or address',
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
  lock_pw: 'Change Passcode',
  lock_finger: 'Change Fingerprint',
  check_passcode: 'Enter your Passcode',
  old_passcode: 'Enter your old passcode',
  new_passcode: 'Enter your new passcode',
  verify_passcode: 'Verify your new passcode',
  reset_mainTxt: 'Reset',
  reset_subTxt: 'We destroy all accounts and information',
  wallet_delete: 'Are you sure delete the wallet?',
  next: 'Next',
  cancel: 'cancel',
  ok: 'Ok',
  delete: 'Delete'
}
const ko = {
  wallet: '지갑',
  wallet_total: '총 자산',
  address_list: '내 주소 관리',
  address_list_back: '내 주소',
  add_address: '주소 추가',
  add_wallet: '지갑 추가',
  wallet_search: '지갑 이름, 주소 검색',
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
  lock_pw: '암호 변경',
  lock_finger: '지문 변경',
  check_passcode: '암호를 입력해주세요',
  old_passcode: '기존 암호를 입력해주세요',
  new_passcode: '새 암호를 입력해주세요',
  verify_passcode: '다시 입력해주세요',
  reset_mainTxt: '초기화',
  reset_subTxt: '모든 계정과 정보를 파기합니다',
  wallet_delete: '연결된 지갑을 삭제하시겠습니까?',
  next: '다음',
  cancel: '취소',
  ok: '확인',
  delete: '삭제'
}

i18n.fallbacks = true
i18n.translations = {en, ko}
i18n.locale = Localization.locale

export default i18n
