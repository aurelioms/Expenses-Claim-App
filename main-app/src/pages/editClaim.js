import {Link, useLocation} from "react-router-dom";
import {collection, query, where, getDocs  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "../firebase";
import { auth } from '../firebase.js'
import { useEffect, useState } from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';




function EditClaimPage()  {

    
    // //State prop settings
    const location = useLocation();
    const dataFetch = location.state;
    console.log("ID: " + dataFetch)

    const auth = getAuth();
    const user = auth.currentUser;
    //console.log(user.email)

    const [data, fetchData] = useState([])
    const usersCollectionRef = collection(db, user.email)
    const q = query(usersCollectionRef, where("ClaimId", "==" , dataFetch))

    useEffect(() => {
        const getData = async () => {
          const data = await getDocs(q);
          fetchData(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getData()
    }, [])

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
          <div class="divider"></div>
            <div>
                <h2>Edit Claim Page</h2>
            </div>
            <h2>Show selected data:</h2>

            {data.map((data) => { 

            return(
                <div>
                    <a>{data.ClaimId}</a>
                    <a>, {data.Claim}</a>
                    <a>, {data.Amount}</a>
                </div>
                )
            })}
        </>
     );
}

function StatusOut() {
    return(<h2>Not Logged In!!!</h2>)
}

function Status() {
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

const editClaim = () => {

    return (  
        <div>
            { Status() === true ?  <EditClaimPage/> : <StatusOut/>}
        </div>

    );
}
 
export default editClaim;