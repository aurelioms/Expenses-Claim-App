
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase.js'
import db, { storage } from "../firebase";
import "../main.css";
import { async } from '@firebase/util';
import { collection } from 'firebase/firestore';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';




function Login_Signup() {

    //Hook states
    let navigate = useNavigate();
    const [user, setUser] = useState({})
    const  [loginStatus, setLoginStatus] = useState(false)

    useEffect(() => {
  
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {          //Check if user is logged in
            setUser(user)
            if (user.email === "linemanager@gmail.com") {
                setLoginStatus(true); 
            } else {
                setLoginStatus(false); 
            }
        })
        //GetStatus()
    }, [])


    //Register + Login states
    const [registerEmail, setRegisterEmail]  = useState("");
    const [registerPassword, setRegisterPassword]  = useState("");
    const [loginEmail, setLoginEmail]  = useState("");
    const [loginPassword, setLoginrPassword]  = useState("");

    async function AddToProfile() {

        const authorize = getAuth()
        const getCurrentUser = authorize.currentUser
    
        //Collection state
        const createCollection = collection(db, getCurrentUser.email)  //User getElementById of email field
    }
    
    /*Register and Login Functions*/ 

    const register = async () => {
        try{
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then(() => {
                navigate('/')
            })
            } catch (error) { 
                console.log(error.message) 
            }
    };
    const login = async () => {
        try{
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(() => {
                if (auth.currentUser.email === "linemanager@gmail.com" ){
                    navigate('/admin')
                } else { navigate('/viewClaim') }
            })
            } catch (error) { 
                console.log(error.message) 
            }
    };

    const logout = async () => {
        await signOut(auth)
    };
    

     return (  
        <>

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
            <Link className='loginsignupbutton' to="/LoginSignup">Login and Sign-Up</Link>
          </nav>
            <h1>Login | Sign Up </h1>
            <br></br>


            <form className='LS'>
                <h3>Signup</h3>
                <input type="email" placeholder='Email...' onChange={(event) => {setRegisterEmail(event.target.value)}} required/>
                <input placeholder='Password...' onChange={(event) => {setRegisterPassword(event.target.value)}} required/>
                <input placeholder='Confirm password...' required/>

                <input type="button" onClick={register} value={"Signup"} ></input>
            </form>


            <form className='LS'>
                <h3>Employee/Staff Login</h3>
                <input placeholder='Email...' onChange={(event) => {setLoginEmail(event.target.value)}}/>
                <input placeholder='Password...' onChange={(event) => {setLoginrPassword(event.target.value)}}/>

                <input type="button" onClick={login} value={"Login"}></input>
            </form>

            <div className='LS'>
                <h3>User - logged in</h3>


                {/* <button onClick={logout}>Logout</button> */}
            </div>
            <br/>
                Logged in as:  {user?.email}
            <br/>
        </>
        );
    }

export default Login_Signup;
