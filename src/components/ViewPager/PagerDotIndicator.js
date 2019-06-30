/**
 * Created by tangzhibin on 16/3/28.
 */

'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import IndicatorViewPager from './IndicatorViewPager'

const DEFAULT_DOT_RADIUS = 8
const SELECTED_DOT_RADIUS = 12
export default class PagerDotIndicator extends Component {
  static propTypes = {
    ...ViewPropTypes,
    pageCount: PropTypes.number.isRequired,
    initialPage: PropTypes.number,
    pager: PropTypes.instanceOf(IndicatorViewPager),
    dotStyle: ViewPropTypes.style,
    selectedDotStyle: ViewPropTypes.style,
    hideSingle: PropTypes.bool,
  }

  static defaultProps = {
    initialPage: 0,
    hideSingle: false,
    dotStyle: {},
    selectedDotStyle: {},
  }

  state = {
    selectedIndex: this.props.initialPage,
  }

  shouldComponentUpdate (nextProps, nextState) {
    const {
      selectedIndex, pageCount, dotStyle, selectedDotStyle, style,
    } = this.state

    return selectedIndex !== nextState.selectedIndex ||
      pageCount !== nextProps.pageCount ||
      dotStyle !== nextProps.dotStyle ||
      selectedDotStyle !== nextProps.selectedDotStyle ||
      style !== nextProps.style
  }

  onPageSelected (e) {
    this.setState({selectedIndex: e.position})
  }

  render () {
    const {pageCount, dotStyle, selectedDotStyle} = this.props
    if (pageCount <= 0) return null
    if (this.props.hideSingle && pageCount === 1) return null
    const dotsView = []
    for (let i = 0; i < pageCount; i++) {
      const isSelect = i === this.state.selectedIndex
      dotsView.push(
        <View
          style={[styles.dot, isSelect ? styles.selectDot : null, isSelect ? selectedDotStyle : dotStyle]}
          key={i} />,
      )
    }

    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
        {dotsView}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: DEFAULT_DOT_RADIUS,
    height: DEFAULT_DOT_RADIUS,
    borderRadius: DEFAULT_DOT_RADIUS >> 1,
    backgroundColor: '#eaeaea',
    margin: DEFAULT_DOT_RADIUS >> 1,
  },
  selectDot: {
    width: SELECTED_DOT_RADIUS,
    height: SELECTED_DOT_RADIUS,
    borderRadius: SELECTED_DOT_RADIUS >> 1,
    margin: SELECTED_DOT_RADIUS >> 1,
    backgroundColor: '#594343',
  },
})
