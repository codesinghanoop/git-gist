import React, { useState } from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import Search from './Search';
import { useHeader } from '../hooks/useHeader';

function Header() {
  const { onChangeUsername, onKeyDown } = useHeader();
  
  return (
    <Wrapper>
      <Octicon name="mark-github" mega/>
      <Search onChange={onChangeUsername} onKeyDown={onKeyDown} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #24292e;
  color: #ffffff;
  z-index: 32;
  padding: 16px;
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

export default Header
