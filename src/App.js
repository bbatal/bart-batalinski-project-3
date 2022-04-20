import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainView from './MainView';
import Profile from './authComponents/Profile'
import Register from './authComponents/Register'
import VerifyEmail from './authComponents/VerifyEmail';
import Login from './authComponents/Login'

import { useState } from 'react';
import { AuthProvider } from './AuthContext';


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <AuthProvider value={{currentUser}}>
        <Routes>
          <Route exact path="/" element={<MainView />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path='/verify-email' element={<VerifyEmail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
