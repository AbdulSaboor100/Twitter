import React, { useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navbar from "../components/navbar";
import { GlobalContext } from "../context/context";
import Home from "../screens/home";
import Login from "../screens/login";
import Register from "../screens/register";
import { auth ,onAuthStateChanged ,getDoc ,doc,db} from "./firebase";

function Routes(){
    let {state , dispatch} = useContext(GlobalContext)
   useEffect(function(){
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            let Ref1 = doc(db,'users',user.uid);
            let  userInfo = await getDoc(Ref1);
              dispatch({type : 'CURRENT_USER' , payload : user})
           
         
                dispatch({type : 'AUTH_USER_DETAILS' , payload : userInfo.data()})
               if(userInfo.data()){
                localStorage.setItem('authUid' , userInfo.data().uid)
               }
    
        } else {
            console.log('USER NOT FOUUND')
            dispatch({type : 'AUTH_USER_DETAILS' , payload : undefined})
            localStorage.setItem('authUid' , null)
        }
      });
   },[])
      
    return(
        <>
        <Router>
            {/* <Navbar /> */}
            <Switch>
                <Route path='/' exact>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/home'>
                    <Home />
                </Route>

            </Switch>
        </Router>
        </>
    )
}

export default Routes;