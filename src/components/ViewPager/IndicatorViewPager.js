/**
 * Created by tangzhibin on 16/3/23.
 */

'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import ViewPager from './ViewPager'

const VIEWPAGER_REF = 'viewPager'
const INDICATOR_REF = 'indicator'
export default class IndicatorViewPager extends Component {
  static propTypes = {
    ...ViewPager.propTypes,
    indicator: PropTypes.node,
    pagerStyle: ViewPropTypes.style,
    horizontalScroll: PropTypes.bool,
    onPageSelected: PropTypes.func,
    goToNext: PropTypes.func,
  }

  static defaultProps = {
    indicator: null,
    initialPage: 0,
    horizontalScroll: true,
  }

  constructor (props) {
    super(props)
    this._onPageScroll = this._onPageScroll.bind(this)
    this._onPageSelected = this._onPageSelected.bind(this)
    this._goToNextPage = this._goToNextPage.bind(this)
    this._renderIndicator = this._renderIndicator.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setPageWithoutAnimation = this.setPageWithoutAnimation.bind(this)
    this._currentIndex = props.initialPage
    this._childrenCount = React.Children.count(props.children)
  }

  componentDidMount () {
    if (this.props.goToNext) {
      this.props.goToNext(this._goToNextPage)
    }
  }

  componentWillUpdate (nextProps) {
    this._childrenCount = React.Children.count(nextProps.children)
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <ViewPager
          {...this.props}
          horizontalScroll={this.props.horizontalScroll}
          ref={VIEWPAGER_REF}
          style={[styles.pager, this.props.pagerStyle]}
          onPageScroll={this._onPageScroll}
          onPageSelected={this._onPageSelected} />
        {this._renderIndicator()}
      </View>
    )
  }

  _onPageScroll (params) {
    const indicator = this.refs[INDICATOR_REF]
    indicator && indicator.onPageScroll && indicator.onPageScroll(params)
    this.props.onPageScroll && this.props.onPageScroll(params)
  }

  _onPageSelected (params) {
    const indicator = this.refs[INDICATOR_REF]
    indicator && indicator.onPageSelected && indicator.onPageSelected(params)
    this.props.onPageSelected && this.props.onPageSelected(params)
    this._currentIndex = params.position
    if (this.props.onPageSelected) {
      this.props.onPageSelected(this._currentIndex)
    }
  }

  _renderIndicator () {
    const {indicator, initialPage} = this.props
    if (!indicator) return null

    return React.cloneElement(indicator, {
      ref: INDICATOR_REF,
      pager: this,
      initialPage: initialPage,
    })
  }

  _goToNextPage () {
    const nextIndex = (this._currentIndex + 1) % this._childrenCount
    this.setPage(nextIndex)
  }

  setPage (selectedPage) {
    this.refs[VIEWPAGER_REF].setPage(selectedPage)
  }

  setPageWithoutAnimation (selectedPage) {
    this.refs[VIEWPAGER_REF].setPageWithoutAnimation(selectedPage)
  }
}

const styles = StyleSheet.create({
  container: {},
  pager: {flex: 1},
})
