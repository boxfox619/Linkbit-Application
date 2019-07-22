import React from 'react'
import { View, Text, Button, Image } from 'react-native'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { PagerDotIndicator, IndicatorViewPager } from '../../components/ViewPager'
import { styles } from './styles'
import i18n from '../../libs/Locale'

@inject('setting')
@observer
export default class GuideView extends React.Component {
  @observable buttonLabel = i18n.t('next')
  @observable currentPage = 0

  constructor (props) {
    super(props)
  }

  onPageSelected = (page) => {
    this.currentPage = page
    if (page == 3) {
      this.buttonLabel = '시작하기'
    } else {
      this.buttonLabel = i18n.t('next')
    }
  }

  onPressNext = () => {
    if (this.currentPage < 3) {
      this.goToNext()
    } else {
      this.props.setting.finishInitialExecution()
    }
  }

  _renderDotIndicator () {
    return <PagerDotIndicator pageCount={4} />
  }

  render () {
    return (
      <View style={styles.container}>
        <IndicatorViewPager
          style={{flex: 1}}
          indicator={this._renderDotIndicator()}
          goToNext={next => this.goToNext = next}
          onPageSelected={this.onPageSelected}>
          <View style={styles.page}>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require('../../assets/ic_public.png')} />
              <Text style={styles.titleLabel}>쉽고 간편하게</Text>
              <Text style={styles.subLabel}>
                누구나 쉽고 간편하게
                {'\n'}
                {' '}
                서비스를 이용할 수 있습니다.
              </Text>
            </View>
          </View>
          <View style={styles.page}>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require('../../assets/ic_security.png')} />
              <Text style={styles.titleLabel}>더 안전하게</Text>
              <Text style={styles.subLabel}>
                자신의 자산을
                {'\n'}
                {' '}
                더 안전하게 보관할 수 있습니다.
              </Text>
            </View>
          </View>
          <View style={styles.page}>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require('../../assets/ic_local_atm.png')} />
              <Text style={styles.titleLabel}>쉽고 간편하게</Text>
              <Text style={styles.subLabel}>
                누구나 쉽고 간편하게
                {'\n'}
                {' '}
                서비스를 이용할 수 있습니다.
              </Text>
            </View>
          </View>
          <View style={styles.page}>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require('../../assets/ic_linkbit.png')} />
              <Text style={styles.titleLabel}>새로운 시작</Text>
              <Text style={styles.subLabel}>
                새로운 실생활 암호화폐
                {'\n'}
                {' '}
                Linkbit과 함께 해봐요!
              </Text>
            </View>
          </View>
        </IndicatorViewPager>
        <Button
          title={this.buttonLabel}
          color="#594343"
          overrides={{backgroundColor: '#594343'}}
          accessibilityLabel="Learn more about this purple button" />
      </View>
    )
  }
}