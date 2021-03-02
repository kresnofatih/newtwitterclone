import React from 'react'
import styled from 'styled-components'
import TrendbarTrending from './trendbarsub/TrendbarTrending'

function Trendbar() {
    return (
        <TrendbarContainer>
            <TrendbarTrending/>
        </TrendbarContainer>
    )
}

export default Trendbar

const TrendbarContainer = styled.div`
    flex: 0.25;
    padding: 10px 20px;
`;