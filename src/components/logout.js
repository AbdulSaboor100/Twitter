import React from "react";
import { useHistory } from "react-router";
import { auth , signOut  } from "../configs/firebase";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Logout(){
    let history = useHistory()
    async function logoutBtn(){
        try {
            await signOut(auth)
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <Button onClick={logoutBtn} variant="contained" color="success">
        Logout
      </Button>
        </>
    )
}

export default Logout