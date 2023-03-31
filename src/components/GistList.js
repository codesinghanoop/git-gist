import React from 'react'
import styled from "styled-components";
import { useGistList } from '../hooks/useGistList';
import Gist from './Gist';

const GistList = () => {
    const { gist } = useGistList(); //Hook to fetch public gist

    //When the data is in loading state
    if(gist?.requestStatus === 'pending') {
        return <p>Loading...</p>
    }

    //When the api failed due to 404, 400, 500 status code & when no search results are found
    if(gist?.requestStatus === 'failed' || (gist?.gistData && gist?.gistData.length === 0)) {
        return <p>We couldn't find any gist, Please try again!</p>
    }

    //Renders the list of pubic and user gist & <Gist /> is a gist row in gist list
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
