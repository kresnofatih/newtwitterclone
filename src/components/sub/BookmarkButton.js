import React, { useEffect } from 'react'
import styled from 'styled-components'
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { useDispatch, useSelector } from 'react-redux';
import { checkTweetBookmarked, getCurrentUserEmail, postTweetToUserBookmarks } from '../../features/userSlice';

function BookmarkButton({friendTweetData, friendData}) {
    const currentUserEmail = useSelector(getCurrentUserEmail);
    const dispatch = useDispatch();
    const [tweetBookmarked, setTweetBookmarked] = React.useState(false);
    const [numOfChanges, setNumOfChanges] = React.useState(0);
    useEffect(()=>{
        checkTweetBookmarked(
            currentUserEmail,
            friendTweetData.email,
            friendTweetData.tweetId,
            (state)=>setTweetBookmarked(state)
        );
    }, [numOfChanges])
    return (
        <BookmarkButtonContainer>
            {tweetBookmarked ? (
                <Saved/>
            ):(
                <NotYetSaved
                    onClick={()=>{
                        dispatch(postTweetToUserBookmarks({
                            displayName: friendTweetData.displayName,
                            photoURL: friendTweetData.photoURL,
                            imageURL: friendTweetData.imageURL,
                            numOfReplies: friendTweetData.numOfReplies,
                            numOfRetweets: friendTweetData.numOfRetweets,
                            numOfLikes: friendTweetData.numOfLikes,
                            timestamp: friendTweetData.timestamp,
                            message: friendTweetData.message,
                            tweetId: friendTweetData.tweetId,
                            email: friendTweetData.email
                        }));
                        setNumOfChanges(prev => prev+1);
                    }}
                />
            )}
        </BookmarkButtonContainer>
    )
}

export default BookmarkButton

const BookmarkButtonContainer = styled.div`
    > .MuiSvgIcon-root {
        :hover {
            cursor: pointer;
        }
    }
`;

const NotYetSaved = styled(SaveAltIcon)`
    :hover {
        color: var(--twitter-blue);
    }
`;

const Saved = styled(SaveAltIcon)`
    color: greenyellow;
`;