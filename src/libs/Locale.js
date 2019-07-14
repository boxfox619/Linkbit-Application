import i18n from 'i18n-js'
import SettingStore from '../store/SettingStore'

const en = {
  finish: 'Finish',
  withdraw: 'Withdraw',
  balance_after_wallet: 'Balance after withdraw',
  finish_withdraw: 'Withdraw finished!',
  withdraw_source_wallet: 'From',
  gettingAddress: 'Create Link Address',
  select_coin: 'Select Coin',
  copied_addr: 'Copied wallet address to clipboard',
  target_address: 'target address',
  copied_target_address: 'Copied target address to clipboard',
  wallet: 'WALLET',
  wallet_name: 'wallet name',
  wallet_total: 'Total',
  link_wallet: 'Link a new wallet',
  search_wallet: 'Wallet name or address...',
  fail_add_wallet: 'Failed create wallet',
  address: 'ADDRESS',
  address_lower: 'Address',
  address_list: 'Address List',
  purchase_address: 'Purchase a address',
  add_address: 'Add a new address',
  edit_address: 'Manage address',
  delete_address: 'Delete a address',
  fail_add_address: 'Add address failed',
  fail_delete_address: 'Delete address failed',
  confirm_delete_address: 'Are you sure you want to delete the linked wallet?',
  transaction: 'TRANSACTION',
  description_tx_fee: 'grow process transcation speed by higher tx fee',
  failed_update_transaction: 'Failed update transactions',
  setting: 'SETTING',
  lang_mainTxt: 'Language',
  lang_subTxt: 'You can select a language by country',
  lang_en: 'English',
  lang_ko: 'Korean',
  bill_mainTxt: 'Currency',
  import: 'import',
  import_wallet_mainTxt: 'Import Wallet',
  import_wallet_subTxt: 'Import the external wallet',
  import_wallet_failed: 'Failed import wallet. Please check entered informations',
  bill_subTxt: 'You can set the unit of currency',
  bill_usd: 'USD - US Dollar',
  bill_krw: 'KRW - Korea Won',
  lock_mainTxt: 'Security',
  lock_subTxt: 'You can set up security methods',
  enter_name: 'Enter name',
  enter_wallet_name: 'Please enter wallet name',
  enter_missing_field: 'Please enter missing field',
  pin: 'Passcode',
  pin_setting: 'Try setting PIN',
  pin_verify: 'Please enter the pin',
  enter_pin_verify: 'Please enter the pin again for verify',
  finish_unset_pin: 'Released pin setting',
  enter_pin: 'Please enter PIN code',
  verify_pin: 'Verify Passcode',
  wrong_pin: 'Passcode is incorrected',
  finger: 'Fingerprint',
  reset_mainTxt: 'Reset',
  reset_subTxt: 'We destroy all accounts and information',
  delete_wallet_mainTxt: 'Delete Wallet',
  delete_wallet_subTxt: 'Delete wallet from Linkbit',
  delete_wallet_success: 'Success delete the wallet',
  success_add: 'Success to create address!',
  err_8char: 'Please enter more than 8 characters',
  err_addr: 'Please enter valid address',
  need_authentication: 'Authentication is required',
  not_support_touch_id: 'Touch ID or Face ID is not supported',
  failed_authentication: 'Authentication failed',
  loading: 'loading',
  loading_setting: 'loading settings',
  loading_address: 'loading address lists',
  loading_wallet: 'loading wallets',
  loading_coin: 'loading coins info',
  loading_finish: 'finish',
  loading_fail: 'loading failed',
  please_check_network: 'Please check network status',
  add: 'Add',
  next: 'Next',
  done: 'Done',
  cancel: 'Cancel',
  agree: 'Agree',
  back: 'Back',
  detail: 'Detail',
  connected: 'connected',
  no_connected: 'no connected',
  set: 'set',
  unset: 'unset',
  terms: `
Linkbit은 프라이빗 키를 비롯한 사용자 정보를 안전하게 암호화하여 기기에 저장하며, 중앙 서버에 이를 보관하지 않아 해킹의 위협이 없습니다.


Linkbit 이용약관

제 1장 총칙

[제 1조(목적)]

이 약관은 Linkbit(이하 “회사”라 함)가 운영하는 “Linkbit” 웹 서비스와 스마트폰 등 이동통신기기를 통해 제공되는 모바일 애플리케이션을 통해서 전자상거래 관련 서비스 및 기타 서비스(이하 “서비스”라 함)를 이용하는 자간의 권리, 의무를 확정하고 이를 이행함으로써 상호발전을 도모하는 것을 그 목적으로 합니다.

[제 2조(약관의 명시, 효력과 개정)]

1. 회사는 이 약관의 내용은 회사의 서비스 회원가입관련 사이트에 게시하거나 기타의 방법으로 사용자에게 공지하고, 이용자가 회원으로 가입하면서 이 약관에 동의함으로써 효력이 발생합니다.
2. 회사는 “약관의 규제에 관한 법률”, “정보통신망 이용촉진 및 정보보호 등에 관한 법률” 등 관련법을 위배하지 않은 범위에서 본 약관을 개정할 수 있습니다.
3. 회사가 약관을 개정할 경우에는 적응일자 및 개정사유를 명시하여 현행약관과 함께 회사 사이트의 초기화면이나 팝업화면 또는 공지사항란에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
4. 회사가 전항에 따라 개정약관을 공지 통지하면서 회원에게 7일간의 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 고지 또는 통지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 개정약관에 동의한 것으로 봅니다.
`,
}
const ko = {
  finish: '완료',
  withdraw: '송금',
  balance_after_wallet: '송금 후 잔액',
  finish_withdraw: '송금 완료!',
  withdraw_source_wallet: '출금 지갑',
  gettingAddress: '새 주소 등록',
  select_coin: '코인을 선택해주세요',
  copied_addr: '지갑 주소가 클립보드에 복사되었습니다',
  target_address: '받는 주소',
  copied_target_address: '상대 주소가 클립보드에 복사되었습니다',
  wallet: '지갑',
  wallet_name: '지갑 이름',
  wallet_total: '총 자산',
  link_wallet: '지갑 연결',
  search_wallet: '지갑 이름 또는 주소',
  address: '주소',
  address_lower: '주소',
  address_list: '주소 목록',
  purchase_address: '주소 구매',
  add_address: '주소 등록',
  edit_address: '주소 관리',
  delete_address: '주소 삭제',
  fail_add_address: '주소 추가를 실패했습니다',
  fail_delete_address: '주소 삭제를 실패했습니다',
  confirm_delete_address: '연결된 지갑을 삭제하겠습니까?',
  transaction: '트랜잭션',
  description_tx_fee: '수수료 금액에 따라서 전송 속도가 결정됩니다',
  failed_update_transaction: '트랜젝션 정보 업데이트를 실패했습니다',
  setting: '설정',
  lang_mainTxt: '언어 설정',
  lang_subTxt: '나라별 언어를 선택할 수 있습니다',
  lang_en: '영어',
  lang_ko: '한국어',
  import: '불러오기',
  import_wallet_mainTxt: '지갑 연결',
  import_wallet_subTxt: '외부 지갑을 연결합니다',
  import_wallet_failed: '지갑 연동에 실패했습니다. 입력한 정보를 확인해주세요',
  bill_mainTxt: '화폐 단위',
  bill_subTxt: '화폐 단위를 설정할 수 있습니다',
  bill_en: '화폐 단위를 설정할 수 있습니다',
  bill_usd: 'USD - 미국 달러',
  bill_krw: 'KRW - 한국 원',
  lock_mainTxt: '보안 설정',
  lock_subTxt: '보안 방법을 설정할 수 있습니다',
  verify_name: '이름을 입력해주세요',
  enter_wallet_name: '지갑 이름을 입력해주세요',
  enter_missing_field: '입력되지 않은 항목이 있습니다',
  pin: '암호',
  pin_setting: 'PIN 번호를 설정합니다',
  pin_verify: '설정한 핀 번호를 입력해주세요',
  enter_pin_verify: '핀 번호를 한번 더 입력해 주세요',
  finish_unset_pin: 'pin 설정을 해제하였습니다',
  enter_pin: '핀번호를 입력해주세요',
  verify_pin: '암호를 확인해주세요',
  wrong_pin: '암호가 일치하지 않습니다',
  finger: '지문',
  reset_mainTxt: '초기화',
  reset_subTxt: '모든 계정과 정보를 파기합니다',
  delete_wallet_mainTxt: '지갑 삭제',
  delete_wallet_subTxt: '지갑을 Linkbit에서 삭제합니다',
  delete_wallet_success: '지갑을 삭제했습니다',
  success_add: '주소를 생성했습니다!',
  err_8char: '8자 이상 입력해주세요',
  err_addr: '올바른 주소를 입력해주세요',
  need_authentication: '인증이 필요합니다',
  not_support_touch_id: 'Touch ID 또는 Face ID가 지원되지 않습니다',
  failed_authentication: 'Authentication failed',
  loading: '로딩중',
  loading_setting: '설정정보 로딩중',
  loading_address: '주소정보 로딩중',
  loading_wallet: '지갑정보 로딩중',
  loading_coin: '코인정보 로딩중',
  loading_finish: '완료',
  loading_fail: '로당 실패',
  please_check_network: '네트워크 상태를 확인해주세요',
  add: '추가하기',
  next: '다음',
  done: '확인',
  cancel: '취소',
  agree: '동의',
  back: '뒤로',
  detail: '상세 정보',
  connected: '개 연동',
  no_connected: '연동 없음',
  set: '설정됨',
  unset: '설정되지 않음',
  terms: `
Linkbit은 프라이빗 키를 비롯한 사용자 정보를 안전하게 암호화하여 기기에 저장하며, 중앙 서버에 이를 보관하지 않아 해킹의 위협이 없습니다.


Linkbit 이용약관

제 1장 총칙

[제 1조(목적)]

이 약관은 Linkbit(이하 “회사”라 함)가 운영하는 “Linkbit” 웹 서비스와 스마트폰 등 이동통신기기를 통해 제공되는 모바일 애플리케이션을 통해서 전자상거래 관련 서비스 및 기타 서비스(이하 “서비스”라 함)를 이용하는 자간의 권리, 의무를 확정하고 이를 이행함으로써 상호발전을 도모하는 것을 그 목적으로 합니다.

[제 2조(약관의 명시, 효력과 개정)]

1. 회사는 이 약관의 내용은 회사의 서비스 회원가입관련 사이트에 게시하거나 기타의 방법으로 사용자에게 공지하고, 이용자가 회원으로 가입하면서 이 약관에 동의함으로써 효력이 발생합니다.
2. 회사는 “약관의 규제에 관한 법률”, “정보통신망 이용촉진 및 정보보호 등에 관한 법률” 등 관련법을 위배하지 않은 범위에서 본 약관을 개정할 수 있습니다.
3. 회사가 약관을 개정할 경우에는 적응일자 및 개정사유를 명시하여 현행약관과 함께 회사 사이트의 초기화면이나 팝업화면 또는 공지사항란에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
4. 회사가 전항에 따라 개정약관을 공지 통지하면서 회원에게 7일간의 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 고지 또는 통지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 개정약관에 동의한 것으로 봅니다.
`,
}

i18n.fallbacks = true
i18n.translations = { en, ko }
i18n.locale = SettingStore.language

export default i18n
