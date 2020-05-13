import React, { useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import Scroll from '../Scroll'
import style from '../../assets/global-style'

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: gray;
    font-size: ${style['font-size-m']};
    /* vertical-align: middle; */
  }
`

const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: 0.8;
  }
`

function HorizonList(props) {
  const { list, oldVal, title } = props
  const { handleClick } = props

  const category = useRef(null)

  useEffect(() => {
    const categoryDom = category.current
    const tagElems = categoryDom.querySelectorAll('span')
    let totalWidth = 0
    Array.from(tagElems).forEach(elem => {
      totalWidth += elem.offsetWidth
    })
    categoryDom.style.width = `${totalWidth}px`
  }, [])

  return (
    <Scroll direction="horizontal">
      <div ref={category}>
        <List>
          <span>{title}</span>
          {
            list.map((item) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick(item.key)}
                >
                  {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

HorizonList.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
}

HorizonList.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

export default HorizonList
