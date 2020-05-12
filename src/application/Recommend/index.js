import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'
import { actionCreators } from './store'
import { Content } from './style'
import Scroll from '../../baseUI/scroll'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'

function Recommend(props) {
  const { bannerList, recommendList } = props

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    getBannerDataDispatch()
    getRecommendListDataDispatch()
    // eslint-disable-next-line
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionCreators.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionCreators.getRecommendList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
