import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import { openScreen, setTrendName } from '../../features/appSlice';

function TrendingItem({numOfTweets, trendName}) {
    const dispatch = useDispatch();
    const openTrendPage = () => {
        dispatch(setTrendName({trendName: trendName}));
        dispatch(openScreen({screen: 'Trend'}));
    }
    return (
        <TrendingItemContainer onClick={openTrendPage}>
            <TrendingItemLeft>
                <h3>{trendName}</h3>
                <h6>{numOfTweets}&nbsp;Tweets</h6>
            </TrendingItemLeft>
            <MoreVertIcon/>
        </TrendingItemContainer>
    )
}

export default TrendingItem

const TrendingItemContainer = styled.label`
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--twitter-dgray);
    
    :hover {
        cursor: pointer;
        background-color: black;

        > div > h3 {
            text-decoration: underline;
        }
    }
`;

const TrendingItemLeft = styled.div`
    display: flex;
    flex-direction: column;
    
    > h3 {
        font-weight: 400;
        font-size: 18px;
    }
    > h6 {
        font-weight: 200;
        font-size: 14px;
        color: var(--twitter-dgray);
    }
`;