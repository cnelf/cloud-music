import React, { useState } from 'react'
import { connect } from 'react-redux'
import HorizonList from '../../baseUI/HorizonList'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer, ListContainer, List, ListItem } from './style'
import Scroll from '../../baseUI/Scroll'
import * as actionCreators from './store/actionCreators'

function Singers(props) {
  const { singetList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props

  const { getHotSingerDispatch, updateSingerListDispatch, pullUpFetchMoreDispatch, pullDownRefreshDispatch } = props

  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')


  const handleUpdateCategory = (val) => {
    setCategory(val)
    updateSingerListDispatch(val, alpha)
  }

  const handleUpdateAlpha = (val) => {
    setAlpha(val)
    updateSingerListDispatch(category, val)
  }

  const handlePullUp = () => {
    pullUpFetchMoreDispatch(category, alpha, category === '', pageCount)
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha)
  }

  // mock歌手列表数据
  const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
    return {
      picUrl: 'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
      name: '隔壁老樊',
      accountId: 277313426
    }
  })

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map((item, index) => {
            return (
              <ListItem key={item.accountId + '' + index}>
                <div className="img-wrapper">
                  <img src={`${item.picUrl}?params=300x300`} width="100%" height="100%" alt="singer" />
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <>
      <NavContainer>
        <HorizonList list={categoryTypes} title={'分类 (默认热门):'} oldVal={category} handleClick={(val) => {handleUpdateCategory(val)}}></HorizonList>
        <HorizonList list={alphaTypes} title={'首字母:'} oldVal={alpha} handleClick={(val) => handleUpdateAlpha(val)}></HorizonList>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
        >
          { renderSingerList() }
        </Scroll>
      </ListContainer>
    </>
  )
}

const mapStateToProps = (state) => ({
  singetList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(actionCreators.getHotSingerList())
    },
    updateSingerListDispatch(category, alpha) {
      dispatch(actionCreators.changePageCount(0))
      dispatch(actionCreators.changeEnterLoading(true))
      dispatch(actionCreators.getSingerList(category, alpha))
    },
    // 上拉加载
    pullUpFetchMoreDispatch(category, alpha, hot, count) {
      dispatch(actionCreators.changePullUpLoading(true))
      dispatch(actionCreators.changePageCount(count + 1))
      if (hot) {
        dispatch(actionCreators.fetchMoreHotSingerList())
      } else {
        dispatch(actionCreators.fetchMoreSingerList(category, alpha))
      }
    },
    // 下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(actionCreators.changePullDownLoading(true))
      dispatch(actionCreators.changePageCount(0))
      if (category === '' && alpha === '') {
        dispatch(actionCreators.getHotSingerList())
      } else {
        dispatch(actionCreators.getSingerList(category, alpha))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
