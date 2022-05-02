import { Route, Navigate, Outlet} from 'react-router-dom'
import { useAuthValue } from './AuthContext'

export default function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuthValue();

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser?.emailVerified ? <Outlet {...props} /> : <Navigate to='/login' />
            }}
        >
        </Route>
    )
}