import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainView from './MainView';
// import Profile from './authComponents/Profile'
import Register from './authComponents/Register'
import VerifyEmail from './authComponents/VerifyEmail';
import Login from './authComponents/Login'

import { useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext';
// import { auth } from './firebaseSetup'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './PrivateRoute';
import BookView from './components/BookView';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    // if(auth) {
    //   setCurrentUser(auth.currentUser)
    //   console.log(currentUser, 'hello');
    // }

    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })

    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, setCurrentUser, timeActive, setTimeActive}}>
        <Routes>
          {/* <Route exact path="/" element={<Login />} /> */}
          <Route exact path='/' element={<PrivateRoute> <MainView /> </PrivateRoute>} />
          <Route exact path='/:id' element={<PrivateRoute>
            <BookView />
          </PrivateRoute>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path='/verify-email' element={<VerifyEmail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
