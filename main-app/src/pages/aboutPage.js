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

              <div class="about-page">
                <div class="divider"></div> 
                <div class="about-border">
                  <p class="about-text">ClaimIt is a web application to simplify the process of managing expense claims for managers and employees
                  </p>
                </div>
                <div class="about-border-2">
                  <div class="about-border-2-text">
                    <p>No more hassle of manually submitting and waiting to create an expense report</p>
                    <br></br>
                    <p>Track expenses on your business trip</p>
                  </div>
                  <img src={require("../images/paper.jpg")}></img>
                </div>
                <h1 class="about-title">How to use</h1>
                <div class="htu-container">
                  <div class="how-to-use">
                    <img src={require("../images/step1.png")}></img>
                    <h1>Sign up and get your ClaimIt account or login</h1>
                  </div>
                  <img class="arrow down" src={require("../images/arrow.png")}></img>
                  <div class="how-to-use">
                    <h1>Hover over the "Claims" button on the navigation bar and choose the "Add New Claim" button</h1>
                    <img src={require("../images/step2.png")}></img>  
                  </div>
                  <img class="arrow down" src={require("../images/arrow.png")}></img>
                  <div class="how-to-use">
                    <img src={require("../images/step3.png")}></img>
                    <h1>Fill out the details of the claims you propose to submit</h1>
                  </div>
                  <img class="arrow down" src={require("../images/arrow.png")}></img>
                  <div class="how-to-use">
                    <img src={require("../images/step4.png")}></img>
                    <h1>You can view your submitted claim status on the "Pending Claim" page</h1>
                  </div>
                  <img class="arrow down" src={require("../images/arrow.png")}></img>
                  <div class="how-to-use">
                    <img src={require("../images/reimburse.png")}></img>
                    <h1>Get reimbursed</h1>
                  </div>
                </div>
                <p class="about-text"></p>
                <h1 class="about-title">Features</h1>
                <div class="features">
                  <ul>
                    <li>
                      <img src={require("../images/tick.png")}></img>
                      <h1>Provide information and submit expense claims</h1>
                    </li>
                  </ul>
                  <img src={require("../images/tick.png")}></img>
                  <h1>Upload pictures of receipts</h1>
                  <img src={require("../images/tick.png")}></img>
                  <h1>Monitor status of submitted claims</h1>
                  <img src={require("../images/tick.png")}></img>
                  <h1>Review list of submitted claims</h1>
                  <img src={require("../images/tick.png")}></img>
                  <h1>Handle claim approval requests</h1>
                  <img src={require("../images/tick.png")}></img>
                  <h1>Do expenses when you travel</h1>
                </div>
              </div>
              <div class="divider"></div>  
          </body>
        </html>

        
     );
}
 
export default AboutPage;