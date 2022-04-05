import { collection, getDocs, query, doc, updateDoc, orderBy } from 'firebase/firestore';
import { useEffect, useState, } from "react";
import { Link } from 'react-router-dom';
import db from "../firebase";
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";

const PendingClaimPage = () => {

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

    const [data, getData] = useState([])
    const usersCollectionRef = collection(db, "Employee")
    const sort = query(usersCollectionRef, orderBy("ID", "desc"))

    useEffect(() => {
      const getData1 = async () => {
        const data_1 = await getDocs(sort);
        getData(data_1.docs.map((doc) => ({...doc.data(), id: doc.id })))
      }
      getData1()
    }, [])

    const Approve = async (email, ClaimId) => {
        try{
          console.log("Email: "+email +", ClaimId: " + ClaimId) 
          const collectionRef = collection(db, email)
          await updateDoc(doc(collectionRef, ClaimId), {
            Approve: "Approved"
          })
       //   DisableAfterClick() 
        }
        catch (e) {
          console.log(e.message)
        }
    }

    const Reject = async (email, ClaimId) => {
      try{
        console.log("Email: "+email +", ClaimId: " + ClaimId) 
        const collectionRef = collection(db, email)
        await updateDoc(doc(collectionRef, ClaimId), {
          Approve: "Rejected"
        })
       // DisableAfterClick() 
      }
      catch (e) {
        console.log(e.message)
      }
  }

  function DisableAfterClick() {
    document.getElementById("finalchoice").disabled = 'disabled';
  }

  function showFiles (numberOfFiles, arrayOfURLS) {

    return [...Array(numberOfFiles)].map((e, i) => 
      <div key={i}>
          <embed className="files"  src={`${arrayOfURLS[i]}`}/>
      </div>);
  }
 
    return ( 
        <div>
            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                <Link className='navbuttons' to="/admin" >Admin</Link>
                <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> 
            </nav>
            <div class="divider"></div>
            <h1>CLAIMS TO APPROVE</h1>

            {data.map((data) => {
                return(
                  <body>
                      <div>
                          <a> Time: {data.ID}</a>,
                          <a> Claim: {data.Claim}</a>,
                          <a> Claim Description: {data.Description}</a>
                          <a> Amount: £{data.Amount}</a>,
                          <a> Sort Code: {data.SortCode}</a>,
                          <a> Account No: {data.AccountNumber}</a>,
                          <a> ClaimID: {data.id}</a>,
                          <a> Status: {data.Approve}</a>
                          <a> Len: {data.NoFiles}</a>
                          <br></br>
                          {<div className="filescontainer">{showFiles(data.NoFiles, data.URLS)}</div>}
                      </div>
                      <button className='finalchoice' onClick={() => Approve(data.email, data.ClaimId)}  value="Approve" >Approve</button>
                      <button className='finalchoice' onClick={() => Reject(data.email, data.ClaimId)}  value="Reject" >Reject</button>
                  </body>
              
                )
            })}
        </div>
     );
}



function StatusOut() {
  return(<h2>Not Admin!!!</h2>)
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
              { Status() === true ?  <PendingClaimPage/> : <StatusOut/>}
      </div>

  );
}

export default viewClaim;
