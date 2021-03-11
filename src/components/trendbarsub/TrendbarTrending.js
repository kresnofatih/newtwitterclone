import React from 'react'
import styled from 'styled-components'
import TrendingItem from './TrendingItem';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../Fire';
import { useDispatch } from 'react-redux';
import { openScreen } from '../../features/appSlice';
import ExploreIcon from '@material-ui/icons/Explore';

function TrendbarTrending() {
    const dispatch = useDispatch();
    const [trends, loading] = useCollection(
        db
        .collection('trends')
        .orderBy('numOfTweets', 'desc')
        .limit(5)
    );
    return (
        <TrendbarTrendingContainer>
            <TrendbarTrendingHeader>
                <h2>Trending</h2>
                <ExploreIcon onClick={()=>{
                    dispatch(openScreen({screen: 'Explore'}));    
                }}/>
            </TrendbarTrendingHeader>
            {trends?.docs.map(doc=>{
                const {numOfTweets, trendname} = doc.data();
                return (
                    <TrendingItem trendName={trendname} numOfTweets={numOfTweets}/>
                )
            })}
            <TrendbarTrendingFooter onClick={()=>{
                dispatch(openScreen({screen: 'Explore'}));
            }}>
                <p>Show more</p>
            </TrendbarTrendingFooter>
        </TrendbarTrendingContainer>
    )
}

export default TrendbarTrending

const TrendbarTrendingContainer = styled.div`
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    background-color: var(--twitter-dblue);
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
`;

const TrendbarTrendingFooter = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 20px;

    :hover {
        cursor: pointer;
    }
    
    > p {
        font-size: 14px;
        font-weight: 200;
        color: var(--twitter-blue);
        :hover {
            text-decoration: underline;
        }
    }
`;
const TrendbarTrendingHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
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