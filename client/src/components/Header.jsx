import React from 'react'
import styled from "styled-components";

const HeaderStyled = styled.div`
    width: 680px;
    min-height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    border: 1px solid black;
    border-radius: 10px 10px 0 0 ;
    background-color: #f9f9f5;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
`

const Header = () => {
  return (
    <HeaderStyled>
        <Title>
            끝말잇기 왕은 누구인가?
        </Title>
    </HeaderStyled>
  )
}

export default Header
