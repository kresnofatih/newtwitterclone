import React from 'react';
import './App.css';
import styled from 'styled-components'
import Navbar from './components/Navbar';
import Feedbar from './components/Feedbar';
import Trendbar from './components/Trendbar';

function App() {
  return (
    <AppContainer>
      <AppContents>
        <Navbar/>
        <Feedbar/>
        <Trendbar/>
      </AppContents>
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