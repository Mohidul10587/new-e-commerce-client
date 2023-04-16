import React, { useContext, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import url from '../../components/url';
import { UserContext } from '../../App';



const RequireAuth = ({ children }) => {

    const value = useContext(UserContext);






    const [loading, setLoading] = useState(true)
    async function handleMe() {


        try {
            await fetch(`${url}/me`, {
                headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            }).then(res => res.json())
                .then(data => {
                    if (data.email) {
                        value.setUser(true)

                    }
                })
        } catch (error) {
            console.log('error', error)
        }
        setLoading(false)
    }
    handleMe()

    if (loading) return <p className='min-h-screen  pt-24'>Loading.......................</p>

    if (value.user) {
        return children;
    }

    return <Navigate to="/login" ></Navigate>;
}

export default RequireAuth








