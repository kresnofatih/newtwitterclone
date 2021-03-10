import React, {useState} from 'react'
import styled from 'styled-components'
import Friend from '../sub/Friend'
import FeedbarHead from './FeedbarHead'
import SearchIcon from '@material-ui/icons/Search';
import {db} from '../../Fire'

function FeedbarExplore() {
    const [formKeyword, setFormKeyword] = useState('');
    const [formResults, setFormResults] = useState('')
    const submitFormKeyword = (e)=>{
        e.preventDefault();
        setFormResults('');
        db.collection('users').where('displayName', '==', formKeyword).onSnapshot(docSnapshot=>{
            docSnapshot.docs.forEach(doc=>{
                setFormResults(doc.data());
            })
        })
        setFormKeyword('');
    }
    return (
        <FeedbarExploreContainer>
            <FeedbarHead pagename={'Explore'}/>
            <FeedbarExploreBody>
                <FeedbarExploreForm onSubmit={submitFormKeyword}>
                    <input
                        value={formKeyword}
                        onChange={e=>setFormKeyword(e.target.value)}
                        placeholder="Search Friends by DisplayName"
                        type="text"
                    />
                    <label onClick={submitFormKeyword}>
                        <SearchIcon/>
                    </label>
                </FeedbarExploreForm>
                {formResults &&
                    <Friend friendData={formResults}/>
                }
            </FeedbarExploreBody>
        </FeedbarExploreContainer>
    )
}

export default FeedbarExplore

const FeedbarExploreContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--twitter-dgray);
    border-right: 1px solid var(--twitter-dgray);
`;

const FeedbarExploreBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
`;

const FeedbarExploreForm = styled.form`
    padding: 20px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--twitter-dgray);

    > input {
        flex: 0.9;
        padding: 10px 20px;
        background-color: var(--twitter-dblue);
        outline: none;
        border: none;
        border-radius: 50ch;
        color: white;

        :focus {
            border: 1px solid var(--twitter-blue);
        }
    }

    > label {
        flex: 0.1;
        text-align: right;
        :hover {
            cursor: pointer;
        }

        > .MuiSvgIcon-root {
            :hover {
                color: var(--twitter-blue);
            }
        }
    }
`;