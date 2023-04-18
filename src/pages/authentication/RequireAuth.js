import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import url from '../../components/url';
import { UserContext } from '../../App';



const RequireAuth = ({ children }) => {

    const value = useContext(UserContext);
  
  console.log(value.loading)
    if (value.user === true) {
      
        return children;
    }
    
    return <Navigate to="/login" ></Navigate>;
}

export default RequireAuth








