import React from 'react'
import styled from 'styled-components'
import FeedbarHome from './feedbarsub/FeedbarHome'
import FeedbarProfilepage from './feedbarsub/FeedbarProfilepage'
import FeedbarTweetpage from './feedbarsub/FeedbarTweetpage'
import {useSelector} from 'react-redux'
import {getCurrentScreen} from '../features/appSlice'
import FeedbarNotif from './feedbarsub/FeedbarNotif'

function Feedbar() {
    const currentPage = useSelector(getCurrentScreen)
    return (
        <FeedbarContainer>
            {currentPage==='Home' &&
                <FeedbarHome/>
            }
            {currentPage==='Profile' &&
                <FeedbarProfilepage/>
            }
            {currentPage==='Tweet' &&
                <FeedbarTweetpage/>
            }
            {currentPage==='Notifications' &&
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