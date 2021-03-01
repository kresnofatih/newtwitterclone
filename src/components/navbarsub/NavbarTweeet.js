import React from 'react'
import styled from 'styled-components'

function NavbarTweeet({onClick}) {
    return (
        <NavbarTweetContainer onClick={onClick}>
            <h4>Tweet</h4>
        </NavbarTweetContainer>
    )
}


export default NavbarTweeet

const NavbarTweetContainer = styled.label`
    margin: 20px 0;
    display: flex;
    justify-content: center;
    padding: 15px 10px;
    background-color: var(--twitter-blue);
    color: white;
    border-radius: 50ch;

    :hover {
        cursor: pointer;
        
        > h4 {
            font-style: italic;
        }
    }
`