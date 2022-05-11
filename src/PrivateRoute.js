import { Navigate } from 'react-router-dom'
import { useAuthValue } from './AuthContext'

export default function PrivateRoute({children}) {
    const {currentUser} = useAuthValue();

    return currentUser?.emailVerified ? children : <Navigate to='/login' />
      
}