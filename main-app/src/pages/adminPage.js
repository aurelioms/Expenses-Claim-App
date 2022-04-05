import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";

const AdminPage = () => {

  const  [loginStatus, setLoginStatus] = useState(false)

  function Status() {                         //Checks if user is logged in and renders based on login status
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user!== null) {
        setLoginStatus(true); //console.log("TRUE")
      } else {
        setLoginStatus(false);  //console.log("FALSE")
      }
    })
    return loginStatus
  }
  useEffect(() => {       //run once
    Status()
  }, [loginStatus])

  const auth = getAuth();
  const logout = async () => {
    await signOut(auth)
  };

    return ( 
        <body>
            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                <Link className='navbuttons' to="/pendingClaim" >Approve Claims</Link>
                <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> 
            </nav>
            <div class="divider"></div>

            <h1>ADMIN PAGE</h1>
            <br></br>
        </body>
     );
}

function StatusOut() {
    return(<h2>Not an Admin!!!</h2>)
}
 
function Status() {                         //Checks if user is logged in and renders based on login status
    const  [loginStatus, setLoginStatus] = useState(false)
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user.email === "linemanager@gmail.com") {
        setLoginStatus(true); //console.log("TRUE")
      } else {
        setLoginStatus(false);  //console.log("FALSE")
      }
    })
    return loginStatus
  }

const viewClaim = () => {

    return (  
        <div>
                { Status() === true ?  <AdminPage/> : <StatusOut/>}
        </div>

    );
}
 
export default viewClaim;

