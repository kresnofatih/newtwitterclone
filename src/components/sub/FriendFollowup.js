import React from 'react'
import styled from 'styled-components'

function FriendFollowup() {
    return (
        <FriendFollowupContainer>
            follow
        </FriendFollowupContainer>
    )
}

export default FriendFollowup

const FriendFollowupContainer = styled.label`
    padding: 5px 20px;
    border: 2px solid var(--twitter-blue);
    border-radius: 50ch;
    font-weight: 600;
    color: white;

    :hover {
        cursor: pointer;
        background-color: var(--twitter-blue);
    }
`;