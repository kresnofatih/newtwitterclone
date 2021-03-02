import React from 'react'
import styled from 'styled-components'
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingItem from './TrendingItem';

function TrendbarTrending() {
    return (
        <TrendbarTrendingContainer>
            <TrendbarTrendingHeader>
                <h2>Trending</h2>
                <SettingsIcon/>
            </TrendbarTrendingHeader>
            <TrendingItem/>
            <TrendingItem/>
            <TrendingItem/>
            <TrendingItem/>
            <TrendbarTrendingFooter>
                <p>Show more</p>
            </TrendbarTrendingFooter>
        </TrendbarTrendingContainer>
    )
}

export default TrendbarTrending

const TrendbarTrendingContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--twitter-dblue);
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
`;

const TrendbarTrendingFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 10px;

    > p {
        font-size: 14px;
        font-weight: 200;
        color: var(--twitter-blue);

        :hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
`;
const TrendbarTrendingHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    border-bottom: 1px solid var(--twitter-dgray);
    

    > h2 {
        margin-bottom: 3px;

        :hover {
            cursor:pointer;
        }
    }

    > .MuiSvgIcon-root {
        :hover {
            cursor: pointer;
        }
    }
`;