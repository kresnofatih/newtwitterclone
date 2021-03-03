import React from 'react'
import styled from 'styled-components'
import TwitterIcon from '@material-ui/icons/Twitter';
import { auth, provider } from './Fire';
import poweredByGiphy from './ZZBX-logo.gif'

function Login() {
    const login=e=>{
        e.preventDefault();
        auth.signInWithPopup(provider).catch(err=>console.log(err));
    }
    return (
        <LoginContainer>
            <LoginBox>
                <LoginHead>
                    <TwitterIcon/>
                </LoginHead>
                <LoginButton onClick={login}>
                    Login
                </LoginButton>
                <img src={poweredByGiphy} alt=""/>
            </LoginBox>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const LoginBox = styled.div`
    padding: 40px;
    border-radius: 20px;
    border: 2px solid var(--twitter-dgray);
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginHead = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginButton = styled.label`
    padding: 10px 20px;
    margin: 30px 20px;
    width: 75%;
    text-align: center;
    border-radius: 5px;
    background-color: var(--twitter-blue);

    :hover {
        opacity: 0.9;
        cursor: pointer;
    }
`;