import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation} from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import { signOut } from 'firebase/auth';

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user)
    let location = useLocation();


    if (loading || adminLoading) return <div className='flex justify-center items-center h-screen'> <p>Loading</p>
    </div>


    if (!user || !admin) {
        signOut(auth)
        return <Navigate to="/logIn" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAdmin;







