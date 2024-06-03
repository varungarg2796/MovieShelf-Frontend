import {jwtDecode , JwtPayload } from 'jwt-decode';


interface User extends JwtPayload {
    username: string;
    sub: string;
}

export const decodeToken = (token: string): User | null => {
    try {
        const decoded = jwtDecode<User>(token);
        console.log(decoded)
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};