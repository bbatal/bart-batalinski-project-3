import {useState} from 'react'
import './forms.css';

import { signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { auth } from '../firebaseSetup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthValue } from '../AuthContext';

function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')

  const { setTimeActive } = useAuthValue();;
  const navigate = useNavigate();

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true);
          navigate('/verify-email')
        })
        .catch(err => alert(err.message))
      } else {
        navigate('/profile');
      }
    })
    .catch(err => setError(err.message))
  }

  const handleGuestLogin = (e) => {
    e.preventDefault();
    console.log('hello');
    signInWithEmailAndPassword(auth, 'bartbatalinski@gmail.com', 'notARealPassword')
    .then(() => {
      navigate('/profile');
    })
  }

  return(
    <div className='center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form name='login_form' onSubmit={login}>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button type='submit'>Login</button>
          <button onClick={(e) => handleGuestLogin(e)}>Login as Guest</button>
        </form>
        <p>
          Don't have and account? 
          <Link to='/register'>Create one here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login