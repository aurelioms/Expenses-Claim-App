
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase.js'
import db, { storage } from "../firebase";
import "../main.css";
import { async } from '@firebase/util';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';
import LoginSignup from './LoginSignUp.js';

const ProfilePage = () => {

    const [profileData, getProfileData] = useState([])

    const auth = getAuth()
    const email = auth.currentUser()

    const getCollectionRef = doc(db, email, "Profile")

    const Data = async () => {
        const data = await getDocs(getCollectionRef);
        getProfileData(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }

    useEffect(() => {
        Data()
    })
    
    const logout = async () => {
        await signOut(auth)
    };
    
    return ( 
        <body>
                <nav className="navbar">
                    <Link className='navbuttons' to="/" >Home</Link>
                    <Link className='navbuttons' to="/about" >About</Link>
                    <div class="dropdown">
                        <button class="dropbtn">Claims <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                        <i class="fa fa-caret-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
                            <Link className='navbuttons' to="/addClaim">Add New Claim</Link>
                        </div>
                    </div> 
                    <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> 
                </nav>
                <br></br>
                <div>
                    {profileData.map((data) => {
                        return(
                            <div>
                                <form className='editprofile'>
                                    <br></br>
                                    <input id='editusername' value={`${data.UserName}`} ></input>
                                    <br></br>
                                    <input id='editemail' value={`${data.Email}`} ></input>
                                    <br></br>
                                    <input id='joined' value={`${data.Joined}`} ></input>
                                </form>
                            </div>
                        )
                    })}
                </div>
        </body>

     );
}
 
function Status() {                         //Checks if user is logged in and renders based on login status
    const  [loginStatus, setLoginStatus] = useState(false)
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user) {
        setLoginStatus(true); 
      } else {
        setLoginStatus(false);  
      }
    })
    return loginStatus
}

const viewClaim = () => {

    return (  
        <div>
                { Status() === true ?  <ProfilePage/> : <LoginSignup/>}
        </div>

    );
}
 
export default viewClaim;