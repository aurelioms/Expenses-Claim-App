import { Link } from 'react-router-dom';
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';


function AboutPage ()  {

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

  const auth = getAuth();
  const logout = async () => {
    await signOut(auth)
  };

    return ( 
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          </head>
          <body class="about-body">

              <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                  <div class="dropdown">
                      <button class="dropbtn">Claims <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                      <i class="fa fa-caret-down"></i>
                      </button>
                      <div class="dropdown-content">
                          {loginStatus === true ?<Link className='navbuttons' to="/viewClaim" >View Claims</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">View Claims</Link>}
                          {loginStatus === true ? <Link className='navbuttons' to="/addClaim">Add New Claim</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">Add New Claim</Link>}
                      </div>
                </div>
                {loginStatus === true ? <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">Login and Sign-Up</Link>}
              </nav>
              <div class="divider"></div>

              <div class="about-main-container">
                <div class="about-page">
                  <div class="divider"></div>
                  <h1 class="about-title">About</h1>
                  <p class="about-text">ClaimIt is a web application to simplify the process of managing expense claims for managers and employees.</p>
                  <h1 class="about-title">How to use</h1>
                  {/* <div class="htu"> */}
                  <div class="htu-container">
                      <div class="how-to-use">
                        <img src={require("../images/register.png")}></img>
                        <h1>Sign up and get your account</h1>
                      </div>
                      <div class="arrow right"></div>
                      <div class="how-to-use">
                        <img src={require("../images/claim.png")}></img>
                        <h1>Create and submit your expense claim</h1>
                      </div>
                    </div>
                    <div class="arrow down"></div>
                    <div class="htu-container">
                      <div class="htu-container">
                        <div class="how-to-use-r2">
                          <div class="how-to-use">
                            <img src={require("../images/manager.png")} class={"how-to-use img"} style={{marginLeft:"50%"}}></img>
                            <h1>Wait for manager approval</h1>
                          </div>
                          <div class="arrow left"></div>
                          <div class="how-to-use">
                            <img src={require("../images/reimburse.png")}></img>
                            <h1>Get your reimbursement</h1>
                        </div>
                        </div>
                      </div>
                    </div>
                  {/* </div> */}
                  {/* <img src={require('../images/register.png')} alt="Register" style={{width:150,marginLeft:100}}></img> */}
                  <p class="about-text"></p>
                </div>
              <div class="divider divider-bottom"></div>
              </div>



          </body>
        </html>

        
     );
}
 
export default AboutPage;