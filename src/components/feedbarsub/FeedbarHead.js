import React from 'react'
import styled from 'styled-components'
import ExtensionIcon from '@material-ui/icons/Extension';

function FeedbarHead({pagename}) {
    return (
        <FeedbarHeadContainer>
            <h2>{pagename}</h2>
            <ExtensionIcon/>
        </FeedbarHeadContainer>
    )
}

export default FeedbarHead

const FeedbarHeadContainer = styled.div`
    margin: 0;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--twitter-dgray);

    > .MuiSvgIcon-root {
        color: var(--twitter-blue);

        :hover {
            cursor: pointer;
        }
    }

    > h2 {
        margin-bottom: 2px;

        :hover {
            cursor: pointer;
        }
    }
`;