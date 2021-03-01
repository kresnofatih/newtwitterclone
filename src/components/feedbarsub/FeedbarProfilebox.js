import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';

function FeedbarProfilebox() {
    return (
        <FeedbarProfileboxContainer>
            <FeedbarProfileBg>
                <img src="https://images.unsplash.com/photo-1542319150-fb62a2e8c476?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80" alt=""/>  
            </FeedbarProfileBg>
            <FeedbarProfileDetails>
                <FeedbarProfileDetailsUpper>
                    <FeedbarProfileAvatar 
                        src="https://i.pinimg.com/originals/9b/89/53/9b8953e917e3a44e0b03b60b603bd469.jpg"
                        alt=""    
                    />
                    <label>follow</label>
                </FeedbarProfileDetailsUpper>
                <h2>Kresno Fatih</h2>
                <h3>@KresnoFatih</h3>
                <FeedbarProfileFollowCount>
                    <h3>12<p>Following</p></h3>
                    <h3>12<p>Followers</p></h3>
                </FeedbarProfileFollowCount>
            </FeedbarProfileDetails>
        </FeedbarProfileboxContainer>
    )
}

export default FeedbarProfilebox

const FeedbarProfileboxContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const FeedbarProfileBg = styled.div`
    height: 200px;
    overflow-y: hidden;
    overflow-x: hidden;
    
    > img {
        width: 100%;
    }
`;

const FeedbarProfileDetails = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;

    > h2 {
        font-size: 20px;
    }
    > h3 {
        font-size: 18px;
        font-weight: 300;
        color: var(--twitter-dgray);
    }
`;
const FeedbarProfileDetailsUpper = styled.div`
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    > label {
        padding: 5px 20px;
        border: 2px solid var(--twitter-blue);
        border-radius: 50ch;
        font-weight: 600;
        color: white;

        :hover {
            cursor: pointer;
            background-color: var(--twitter-blue);
        }
    }

    
`;
const FeedbarProfileAvatar = styled(Avatar)`
    margin-top: -60px;
    height: 100px !important;
    width: 100px !important;

    :hover {
        cursor: pointer;
    }
`;

const FeedbarProfileFollowCount = styled.div`
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;

    > h3 {
        margin-right: 30px;
        display: flex;
        font-size: 16px;
        flex-direction: row;
    }
    > h3 > p {
        margin-left: 5px;
        font-weight: 200;
        color: var(--twitter-lgray);
    }
`;