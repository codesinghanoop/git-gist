import React, { useState } from 'react'
import { useAppDispatch } from '../state';
import { fetchGistByUsername, fetchPublicGist } from '../state/gist';

export const useHeader = () => {
  const [userName, setUserName] = useState();
  const dispatch = useAppDispatch();

  const onChangeUsername = (e) => {
    setUserName(e.currentTarget.value);
  }

  //Trigger search on on click of enter button & display public gist when input is empty
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if(userName) return dispatch(fetchGistByUsername(userName));
      return dispatch(fetchPublicGist());
    }
  }

  return {
    onChangeUsername,
    onKeyDown
  }
}