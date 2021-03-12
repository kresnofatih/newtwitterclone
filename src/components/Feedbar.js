import React from 'react'
import styled from 'styled-components'
import FeedbarHome from './feedbarsub/FeedbarHome'
import FeedbarProfilepage from './feedbarsub/FeedbarProfilepage'
import FeedbarTweetpage from './feedbarsub/FeedbarTweetpage'
import {useSelector} from 'react-redux'
import {getCurrentScreen} from '../features/appSlice'
import FeedbarNotif from './feedbarsub/FeedbarNotif'
import FeedbarExplore from './feedbarsub/FeedbarExplore'
import FeedbarBookmarks from './feedbarsub/FeedbarBookmarks'
import FeedbarTrendPage from './feedbarsub/FeedbarTrendPage'

function Feedbar() {
    const currentScreen = useSelector(getCurrentScreen)
    return (
        <FeedbarContainer>
            {currentScreen==='Home' &&
                <FeedbarHome/>
            }
            {currentScreen==='Profile' &&
                <FeedbarProfilepage/>
            }
            {currentScreen==='Tweet' &&
                <FeedbarTweetpage/>
            }
            {currentScreen==='Notifications' &&
                <FeedbarNotif/>
            }
            {currentScreen==='Explore' &&
                <FeedbarExplore/>
            }
            {currentScreen==='Bookmarks' &&
                <FeedbarBookmarks/>
            }
            {currentScreen==='Trend' &&
                <FeedbarTrendPage/>
            }
        </FeedbarContainer>
    )
}

export default Feedbar

const FeedbarContainer = styled.div`
    height: 100vh;
    flex: 0.5;
    display: flex;
    flex-direction: column;

    @media (max-width: 815px){
        flex: 0.6;
    }
    @media (max-width: 730px){
        flex: 0.8;
    }
`;