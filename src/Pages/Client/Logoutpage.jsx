import React, { useEffect } from 'react'
import { selectLoggedInUser, signoutAsync } from '../../Features/Authslice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Logoutpage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        dispatch(signoutAsync(user))
        window.location.reload();
    })
    
    return (
        <div>
            {
                !user &&
                <Navigate to={'/'} replace={true}></Navigate>
            }
            
        </div>
    )
}

export default Logoutpage
