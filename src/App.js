import React, {useEffect} from 'react';
import './App.css';
import styled from 'styled-components'
import Navbar from './components/Navbar';
import Feedbar from './components/Feedbar';
import Trendbar from './components/Trendbar';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './Fire'
import Login from './Login';
import {useDispatch, useSelector} from 'react-redux'
import { getCurrentUser, listenUserDataFromDb, setUserDataFromDb } from './features/userSlice';
import Loading from './components/Loading';
import {Helmet} from 'react-helmet';

function App() {
  const currentUser = useSelector(getCurrentUser);
  const [account] = useAuthState(auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    listenUserDataFromDb(account, ()=>{dispatch(setUserDataFromDb(account.email))})
  }, [account])
  return (
    <AppContainer>
      <Helmet>
        <title>Twitter Clone</title>
      </Helmet>
      {!account ? (
        <Login/>
      ):(
        <AppContents>
          {currentUser.email!=='displayName@gmail.com' ? (
            <>
              <Navbar/>
              <Feedbar/>
              <Trendbar/>
            </>
          ):(
            // <p>TestLoading</p>
            <Loading/>
          )}
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
  justify-content: center;
`;