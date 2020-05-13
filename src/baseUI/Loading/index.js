import React from 'react'
import styled, { keyframes } from 'styled-components'
import style from '../../assets/global-style'

const loading = keyframes`
  0%, 100% {
    transform: scale(0)
  }
  50% {
    transform: scale(1)
  }
`

const LoadingWrapper = styled.div`
  > div {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${style['theme-color']};
    opacity: 0.6;
    animation: ${loading} 1.4s infinite ease-in;
    z-index: 1000;
  }
  > div:nth-child(2) {
    animation-delay: -0.7s;
  }
`

export default function Loading() {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  )
}
