import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const PasswordResetPage = () => {

    const auth = getAuth()

    const resetPassword = async () => {
        const emailReset = document.getElementById('emailpasswordreset').value
        try{
            await sendPasswordResetEmail(auth, emailReset)
            alert("sent!")
        }
        catch (e) {
            console.log(e.message)
            alert('Email does not exist on our database!')
        }
    } 

    return ( 
        <body>
            <form>
                <h1>Password Reset</h1>
                <br></br>
                <input type="" id='emailpasswordreset' placeholder='Reset Email...' ></input>
                <br></br>
                <button type='button' onClick={resetPassword}>Send</button>
            </form>
        </body>
     );
}
 
export default PasswordResetPage;