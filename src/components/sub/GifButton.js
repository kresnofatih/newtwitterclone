import React, {useState} from 'react'
import {Grid} from '@giphy/react-components'
import {GiphyFetch} from '@giphy/js-fetch-api'
import styled from 'styled-components'
import GifIcon from '@material-ui/icons/Gif';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';

const giphyFetch = new GiphyFetch('k4ArhIzAiRh7mRABtmd2ydnWVpAexvHK');

function GridGiphy({onGifClick, gifKeyword}){
    const fetchGifs = (offset) => giphyFetch.search(gifKeyword, {offset, limit: 10});
    return (
        <Grid
            onGifClick={onGifClick}
            fetchGifs={fetchGifs}
            width={300}
            columns={2}
            gutter={6}
        />
    )
}


function GifButton() {
    // GifBrowser Open/Close
    const [anchorEl, setAnchorEl] = useState(null);
    const openGifPopover = (event)=> {
        setAnchorEl(event.currentTarget);
    }
    const closeGifPopover = ()=> {
        setAnchorEl(null);
    }
    const open =Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // GifBrowser SearchEngine
    const [hasGifKeyword, setHasGifKeyword] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [gifKeyword, setGifKeyword] = useState('kon');
    const submitSearchKeyword = (e) => {
        e.preventDefault();
        setGifKeyword(searchKeyword);
        setSearchKeyword('');
        setHasGifKeyword(true);
    }
    return (
        <GifButtonContainer>
            <GifButtonObject
                aria-describedby={id} 
                variant="contained"
                onClick={openGifPopover}
            >
                <GifIcon/>
            </GifButtonObject>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={closeGifPopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <GridGiphyContainer>
                    <GifSearch onSubmit={submitSearchKeyword}>
                        <input
                            value={searchKeyword}
                            onChange={e=>{
                                setHasGifKeyword(false);
                                setSearchKeyword(e.target.value);
                            }}
                            placeholder="Type Keywords & Press Enter!"
                            type="text"
                        />
                    </GifSearch>
                    {hasGifKeyword &&
                        <GridGiphy
                            onGifClick={(gif, e)=>{
                                e.preventDefault();
                                console.log(gif.images.downsized_medium.url);
                                closeGifPopover();
                            }}
                            gifKeyword={gifKeyword}
                        />
                    }
                </GridGiphyContainer>
            </Popover>
        </GifButtonContainer>
    )
}

export default GifButton

const GifButtonContainer = styled.div``;

const GifSearch = styled.form`
    padding: 10px 0;
    width: 285px;
    > input {
        width: 285px;
        background-color: transparent;
        color: white;
        padding: 10px 0px;
        border:none;
        outline: none;
        border-bottom: 2px solid white;
        font-weight: 400;
    }
`;

const GifButtonObject = styled.label`

    > .MuiSvgIcon-root {
        font-size: 25px;
        color: var(--twitter-blue);
        :hover {
            cursor: pointer;
        }
    }
`;

const GridGiphyContainer = styled.div`
    max-height: 300px;
    width: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    scrollbar-width: none;
    background-color: var(--twitter-blue);
`;