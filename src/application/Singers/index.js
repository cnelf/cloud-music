import React, { useState } from 'react'
import HorizonList from '../../baseUI/HorizonList'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer } from './style'

function Singers() {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const handleUpdateCategory = (val) => {
    setCategory(val)
  }

  const handleUpdateAlpha = (val) => {
    setAlpha(val)
  }

  return (
    <NavContainer>
      <HorizonList list={categoryTypes} title={'分类 (默认热门):'} oldVal={category} handleClick={(val) => {handleUpdateCategory(val)}}></HorizonList>
      <HorizonList list={alphaTypes} title={'首字母:'} oldVal={alpha} handleClick={(val) => handleUpdateAlpha(val)}></HorizonList>
    </NavContainer>
  )
}

export default React.memo(Singers)
