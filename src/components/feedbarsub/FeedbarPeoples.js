import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components'
import { db } from '../../Fire';
import Loading from '../Loading';
import Friend from '../sub/Friend';
import FeedbarHead from './FeedbarHead'

function FeedbarPeoples() {
    const [peoples, loading] = useCollection(
        db
            .collection('users')
            .orderBy('numOfFollowers', 'desc')
            .limit(5)
    );
    return (
        <FeedbarPeoplesContainer>
            <FeedbarHead pagename="People To Follow"/>
            {loading &&
                <Loading/>
            }
            {peoples?.docs.map(doc=>(
                <Friend friendData={doc.data()}/>
            ))}
        </FeedbarPeoplesContainer>
    )
}

export default FeedbarPeoples

const FeedbarPeoplesContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;