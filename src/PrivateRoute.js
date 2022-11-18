import { Navigate } from 'react-router-dom'
import { useAuthValue } from './AuthContext'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function PrivateRoute({children}) {
    const {currentUser, setCurrentUser} = useAuthValue();
    const [pending, setPending] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            user => {
                setCurrentUser(user);
                setPending(false);
            },
            error => {
                // any error logging, etc...
                setPending(false);
            }
        );

        return unsubscribe;

        // eslint-disable-next-line
    }, [])

    if (pending) return null; 


    

    return currentUser?.emailVerified ? children : <Navigate to='/login' />
}