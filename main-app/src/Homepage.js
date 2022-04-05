import { Link,  Outlet } from 'react-router-dom';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlaneArrival, faFileShield, faMoneyBillTransfer, faCaretDown} from '@fortawesome/free-solid-svg-icons';

import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";

//Images

//Pages
import "./main.css"
import "./reset.css"
import { useEffect, useState } from 'react';

function App() {

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
  }, [])

  const logout = async () => {
    await signOut(auth)
  };

  const auth = getAuth();

  return (
      

      <div className="App">

          <nav className="navbar">
              <Link className='navbuttons' to="/" >Home</Link>
              <Link className='navbuttons' to="/about" >About</Link>
                <div class="dropdown">
                    <button class="dropbtn">Claims  <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                     <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        {loginStatus === true ?<Link className='navbuttons' to="/viewClaim" >View Claims</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">View Claims</Link>}
                        {loginStatus === true ? <Link className='navbuttons' to="/addClaim">Add New Claim</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">Add New Claim</Link>}
                    </div>
              </div>
              {loginStatus === true ? <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">Login and Sign-Up</Link>}
            </nav>


            <div class="home-page-section">
            <h1 class="home-title">ClaimIT</h1> 
            <p class="home-description">Claim expenses with ease.</p>
            </div>


          <div class="divider"></div>

          <div class="card-section">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                <div class="divider"></div>
                  <div class="card-text">
                    <FontAwesomeIcon icon={faPlaneArrival} class="icon-img"/>
                    <h1 class="card-title">Travel</h1>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="card-text card-text-back">
                  <h1>Travel:</h1>
                  <p>Employees can use our simple, interactive app to claim any business travel expenses.</p>
                  <p>Easy for managers to follow and read all claims made by employees.</p>
                  
                  </div>
                </div>
              </div>
            </div>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                <div class="divider"></div>
                  <div class="card-text">
                    <FontAwesomeIcon icon={faFileShield} class="FileShield"/>
                    <h1 class="card-title">Paperless</h1>
                  </div>
                
                </div>
                
                <div class="flip-card-back">
                  <div class="card-text card-text-back">
                  <h1>Paperless:</h1>
                  <p>No need to carry around countless reciepts. Upload all reciepts when creating an expense claim with ease.</p>
                  
                  </div>
                </div>
              </div>
              
            </div>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                <div class="divider"></div>
                  <div class="card-text">
                    <FontAwesomeIcon icon={faMoneyBillTransfer} class="icon-img"/>
                    <h1 class="card-title">Expense</h1>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="card-text card-text-back">
                  <h1>Expense:</h1>
                  <p>Instant claim managing, fast response time between employee and manager.</p>
                  <p>Employees can constantly track the status of pending claims.</p>
                  
                  </div>
                </div>
              </div>
            </div>

            

          </div>


          <div class="footer"><h1>footer</h1></div>

            <Outlet/>


            

      </div>

  );
}

export default App;
