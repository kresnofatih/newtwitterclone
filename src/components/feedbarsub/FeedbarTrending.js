import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components'
import { db } from '../../Fire';
import Loading from '../Loading';
import TrendingItem from '../trendbarsub/TrendingItem';
import FeedbarHead from './FeedbarHead'

function FeedbarTrending() {
    const [trendingTrends, loading] = useCollection(
        db
            .collection('trends')
            .orderBy('numOfTweets', 'desc')
            .limit(10)
    );
    return (
        <FeedbarTrendingContainer>
            <FeedbarHead pagename="Trending"/>
            {loading &&
                <Loading/>
            }
            {trendingTrends?.docs.map(doc=>{
                const {numOfTweets, trendname} = doc.data();
                return (
                    <TrendingItem trendName={trendname} numOfTweets={numOfTweets}/>
                )
            })}
        </FeedbarTrendingContainer>
    )
}

export default FeedbarTrending

const FeedbarTrendingContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;