import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase.js'
import db, { storage } from "../firebase";
import "../main.css";
import { async } from '@firebase/util';
import { collection, doc, setDoc } from 'firebase/firestore';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';



function Login_Signup() {

    //Hook states
    let navigate = useNavigate();


    //Register + Login states
    const [registerEmail, setRegisterEmail]  = useState("");
    const [registerPassword, setRegisterPassword]  = useState("");
    const [loginEmail, setLoginEmail]  = useState("");
    const [loginPassword, setLoginrPassword]  = useState("");
    
    /*Register and Login Functions*/ 

    const register = async () => {
        try{
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then(() => {
                //CreateDetails()
                navigate('/')
            })
            } catch (error) { 
                console.log(error.message) 
            }
    };
    const CreateDetails = async () => {
        const createCollectionProfile = collection(db, registerEmail)

        const createProfileDoc = doc(createCollectionProfile, "Profile")
        const dateNow = Date.now()

        await setDoc(createProfileDoc, {
            UserName: "",
            Email: registerEmail ,
            Address: "", 
            Joined: dateNow, 
            Status: "Active"
        })
    }

    const login = async () => {
        try{
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(() => {
                if (auth.currentUser.email === "linemanager@gmail.com" ){
                    navigate('/admin')
                } else { navigate('/viewClaim'); }
            })
            } catch (error) { 
                console.log(error.message) 
                alert('Incorrect Email/Password')
            }
    };

    const navigateToReset = () => {
        navigate('/reset')
    }

    return (  
        <>
       
        <nav className="navbar">
            <Link className='navbuttons' to="/" >Home</Link>
            <Link className='navbuttons' to="/about" >About</Link>
              {/* <div class="dropdown">
                  <button class="dropbtn">Claims <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                   <i class="fa fa-caret-down"></i>
                  </button>
                  <div class="dropdown-content">
                      <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
                      <Link className='navbuttons' to="/addClaim">Add New Claim</Link>
                  </div>
            </div>  */}
            <Link className='loginsignupbutton active-page' to="/LoginSignup">Login and Sign-Up</Link>
        </nav>

          
          <link rel="stylesheet" type="text/css" href="src/bootstrap.min.css"></link>
    <meta charset="UTF-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <title>ClaimIT</title>
   
    <body>
        <div className ="form-body">
            <div className="form-holder"> 
                <div className="form-content">
                    <div className="form-items">
                        <h3>Reinvent your expense reporting.</h3> 
                        <p>Never leave your expense reports to your desk.</p>
                        
                        <div class="page-links">
                                        <a href="" class="active">Login</a>
                        </div>

                        <form>
                            <h3>Employee/Staff Login</h3>
                            <input placeholder='Email...' onChange={(event) => {setLoginEmail(event.target.value)}}/>
                            <input type ="password" placeholder='Password...' onChange={(event) => {setLoginrPassword(event.target.value)}}/>
                            <div className="form-button">
                            
                            <button type ="button"  onClick={login} className="ibtn" value={"Login"}>Login</button>
                            <button type ="button"  onClick={ navigateToReset } className="ibtn">Forgotten Password</button>
                            </div>
                        </form>

                        <div class="page-links">
                                        <a href="" class="active">Register</a>
                        </div>

                        <form>
                            <h3>Signup</h3>
                            <input className ="form-control" type="email" placeholder='Email...' onChange={(event) => {setRegisterEmail(event.target.value)}} required/>
                            <input type="password" className ="form-control" placeholder='Password...' onChange={(event) => {setRegisterPassword(event.target.value)}} required/>
                            <input type="password" className ="form-control" placeholder='Confirm password...' required/>
                            <div className="form-button">
                            <button className="ibtn" type="button" onClick={() => {register();}} value={"Signup"} >Sign Up</button>
                            </div>
                        </form>
        
                        <div className='LS'>
                           {/* <button onClick={logout}>Logout</button> */}
                        </div>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    </body>
        </>
        );
    }

export default Login_Signup;