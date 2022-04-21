import './verifyEmail.css';
import { useAuthValue } from '../AuthContext';

import { useState, useEffect } from 'react';
import { auth } from '../firebaseSetup';
import { sendEmailVerification } from 'firebase/auth';


function VerifyEmail() {
    const { currentUser } = useAuthValue();
    const [time, setTime] = useState(60);
    const { timeActive, setTimeActive } = useAuthValue();
    

    useEffect(() => {
        let interval = null;
        if(timeActive && time !== 0) {
            interval = setInterval(() => {
                setTime((time) => time - 1)
            }, 1000)
        } else if(time === 0) {
            setTimeActive(false)
            setTime(60)
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [timeActive, time])

    const resendEmailVerification = () => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            setTimeActive(true);
        }).catch((err) => {
            alert(err.message);
        })
    }



  return (
    <div className='center'>
      <div className='verifyEmail'>
        <h1>Verify your Email Address</h1>
        <p>
          <strong>A Verification email has been sent to:</strong><br/>
          <span>{currentUser?.email}</span>
        </p>
        <span>Follow the instruction in the email to verify your account</span>
        <button
           onClick={resendEmailVerification}  
           disabled={timeActive}
          >Resend Email {timeActive && time}</button>
      </div>
    </div>
  )
}

export default VerifyEmail