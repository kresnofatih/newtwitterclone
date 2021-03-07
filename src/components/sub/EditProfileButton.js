import React from 'react'
import styled from 'styled-components'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import EditProfileForm from './EditProfileForm';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 2,
      color: '#fff',
    },
}));

function EditProfileButton() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <>
            <EditProfileButtonObject onClick={handleToggle}>
                edit profile
            </EditProfileButtonObject>
            <Backdrop className={classes.backdrop} open={open}>
                <EditFormContainer>
                    <EditFormContainerHead>
                        <h3><CloseIcon onClick={handleClose}/>&nbsp;&nbsp;Edit Profile</h3>
                    </EditFormContainerHead>
                    <EditProfileForm additionalCallbacks={handleClose}/>
                </EditFormContainer>
            </Backdrop>
        </>
    )
}

export default EditProfileButton

const EditProfileButtonObject = styled.label`
    padding: 5px 20px;
    border: 2px solid var(--twitter-blue);
    border-radius: 50ch;
    font-weight: 600;
    color: white;

    :hover {
        cursor: pointer;
        background-color: var(--twitter-blue);
    }
`;

const EditFormContainerHead = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;

    > h3 {
        display: flex;
        align-items: center;

        > .MuiSvgIcon-root {
            margin-top: 2px;
            :hover {
                cursor: pointer;
            }
        }
    }
    > label {
        :hover {
            cursor: pointer;
        }
    }
`

const EditFormContainer = styled.div`
    width: 500px;
    background-color: black;
    border-radius: 20px;
    /* padding: 10px 10px; */
    border: 1px solid var(--twitter-blue);
    display: flex;
    flex-direction: column;

    > .MuiSvgIcon-root {
        :hover {
            color: var(--twitter-blue);
            cursor: pointer;
        }
    }
`;