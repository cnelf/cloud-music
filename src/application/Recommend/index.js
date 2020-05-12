import React, { useState, useEffect } from 'react'
import Scroll from '../../baseUI/scroll'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import { Content } from './style'
import { getBannerRequest, getRecommendListRequest } from '../../api/request'

function Recommend() {
  const [bannerList, setBannerList] = useState([])
  const [recommendList, setRecommendList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { banners } = await getBannerRequest()
      setBannerList(banners)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const { result } = await getRecommendListRequest()
      setRecommendList(result)
    }
    fetchData()
  }, [])

  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

export default React.memo(Recommend)
