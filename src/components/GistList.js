import React from 'react'
import styled from "styled-components";
import { useGistList } from '../hooks/useGistList';
import Gist from './Gist';

const GistList = () => {
    const { gist } = useGistList();

    if(gist?.requestStatus === 'pending') {
        return <p>Loading...</p>
    }

    if(gist?.requestStatus === 'failed') {
        return <p>We couldn't find any gist, Please try again!</p>
    }

    return (
    <Container>
      {gist?.gistData && gist?.gistData.map((item) => <Gist key={item?.id} gist={item} />)}
    </Container>
    )
}

const Container = styled.div`
    background-color: #fffff;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default GistList
