import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainView from './MainView';
// import Profile from './authComponents/Profile'
import Register from './authComponents/Register'
import VerifyEmail from './authComponents/VerifyEmail';
import Login from './authComponents/Login'

import { useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import { auth } from './firebaseSetup'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './PrivateRoute';
import BookView from './components/BookView';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })

    // console.log(new Date())
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path='/profile' element={<PrivateRoute> <MainView /> </PrivateRoute>} />
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
