import React from "react";
import {
    Link
} from "react-router-dom";

function Navbar(){
    return(
        <>
        <Link to='/register'>Register</Link>
        <Link to='/'>Login</Link>
        <br /><br /><br />
        </>
    )
}

export default Navbar;