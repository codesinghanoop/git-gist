import React, { useState } from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import Search from './Search';
import { useAppDispatch } from '../state';
import { fetchGistByUsername, fetchPublicGist } from '../state/gist';

function Header() {
  const [userName, setUserName] = useState();
  const dispatch = useAppDispatch();

  const onChangeUsername = (e) => {
    setUserName(e.currentTarget.value);
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if(userName) return dispatch(fetchGistByUsername(userName));
      return dispatch(fetchPublicGist());
    }
  }

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
