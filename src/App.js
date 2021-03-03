import React, {useEffect} from 'react';
import './App.css';
import styled from 'styled-components'
import Navbar from './components/Navbar';
import Feedbar from './components/Feedbar';
import Trendbar from './components/Trendbar';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './Fire'
import Login from './Login';
import {useDispatch} from 'react-redux'
import { setUserDataFromDb } from './features/userSlice';

function App() {
  const [account, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(account!==null){dispatch(setUserDataFromDb(account.email))}
  }, [account])
  return (
    <AppContainer>
      {!account ? (
        <Login/>
      ):(
        <AppContents>
          <Navbar/>
          <Feedbar/>
          <Trendbar/>
        </AppContents>
      )}
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
  color: white;
  background-color: black;
  display: flex;
  justify-content: center;
`;

const AppContents = styled.div`
  width: 1300px;
  display:flex;
`;