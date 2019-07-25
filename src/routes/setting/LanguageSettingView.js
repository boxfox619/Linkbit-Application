import React from 'react'
import { observer, inject } from 'mobx-react'
import i18n from '../../libs/Locale'
import { SettingListView } from '../../components/List'

const language = [
  {
    labelText: i18n.t('lang_ko'),
    key: 'ko',
  }, {
    labelText: i18n.t('lang_en'),
    key: 'en',
  },
]

@inject(['setting'])
@observer
export default class LanguageSettingView extends React.Component {
  static navigationOptions = () => {
    return {
      title: i18n.t('lang_mainTxt'),
      headerTitleStyle: { color: 'black' },
      headerStyle: { backgroundColor: 'white' },
    }
  }

  handleLanguageSetting = async (val) => {
    await this.props.setting.setLanguage(val)
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <SettingListView style={{ padding: 20 }} list={language} onItemSelected={this.handleLanguageSetting} />
    )
  }
}