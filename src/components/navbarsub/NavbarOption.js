import React from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {getCurrentScreen} from '../../features/appSlice'

function NavbarOption({Icon, text, onClick}) {
    const currentPage = useSelector(getCurrentScreen);
    return (
        <NavbarOptionContainer>
            {currentPage===text ? (
                <NavbarOptionActive>
                    {Icon && <Icon/>}
                    {text &&
                        <h2>{text}</h2>
                    }
                </NavbarOptionActive>
            ):(
                <NavbarOptionInactive onClick={onClick}>
                    {Icon && <Icon/>}
                    {text &&
                        <h2>{text}</h2>
                    }
                </NavbarOptionInactive>
            )}
        </NavbarOptionContainer>
    )
}

export default NavbarOption

const NavbarOptionContainer = styled.div``;

const NavbarOptionActive = styled.div`
    display: flex;
    margin: 0;
    padding: 15px 10px;
    align-items: center;

    > .MuiSvgIcon-root {
        color: var(--twitter-blue);
    }

    > h2 {
        margin: 0;
        margin-left: 20px;
        margin-bottom: 2px;
        padding: 0;
        color: var(--twitter-blue);
    }
`;

const NavbarOptionInactive = styled.label`
    display: flex;
    margin: 0;
    padding: 15px 10px;
    align-items: center;

    :hover {
        cursor: pointer;
        > h2 {
            color: var(--twitter-blue);
        }

        > .MuiSvgIcon-root {
            color: var(--twitter-blue);
        }
    }

    > h2 {
        margin: 0;
        margin-left: 20px;
        margin-bottom: 2px;
        padding: 0;
    }
`;