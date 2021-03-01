import React from 'react'
import styled from 'styled-components'

function NavbarOption({Icon, text, onClick}) {
    return (
        <NavbarOptionContainer onClick={onClick}>
            {Icon && <Icon/>}
            {text &&
                <h2>{text}</h2>
            }
        </NavbarOptionContainer>
    )
}

export default NavbarOption

const NavbarOptionContainer = styled.label`
    display: flex;
    margin: 0;
    padding: 15px 10px;
    align-items: center;

    > h2 {
        margin: 0;
        margin-left: 20px;
        margin-bottom: 2px;
        padding: 0;
    }
`;