import React from 'react';
import { decodeToken } from '../utils/DecodeJwt';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const accessToken = Cookies.get('access_token');   

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    const decodedToken = decodeToken(accessToken);

    if (!decodedToken || !decodedToken.exp || decodedToken.exp * 1000 < Date.now()) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};

export default AuthGuard;