import React from 'react'
import styled from 'styled-components'
import FeedbarHome from './feedbarsub/FeedbarHome'
import FeedbarProfilepage from './feedbarsub/FeedbarProfilepage'
import FeedbarTweetpage from './feedbarsub/FeedbarTweetpage'
import {useSelector} from 'react-redux'
import {getCurrentScreen} from '../features/appSlice'
import FeedbarNotif from './feedbarsub/FeedbarNotif'

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
        </FeedbarContainer>
    )
}

export default Feedbar

const FeedbarContainer = styled.div`
    height: 100vh;
    flex: 0.5;
    display: flex;
    flex-direction: column;
`;