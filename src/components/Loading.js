import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit' 

function Loading() {
    return (
        <LoadingContainer>
            <Spinner name="ball-pulse-sync" color="steelblue"/>
        </LoadingContainer>
    )
}

export default Loading

const LoadingContainer = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;