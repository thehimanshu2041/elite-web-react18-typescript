import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import restUtils from '../../utils/rest';
import { AuthModel, AuthUserModel } from '../../model/auth';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ELITE_TOKEN } from '../../model/elite';


const CXT_PATH = process.env.REACT_APP_BASE_URL;

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (payload: AuthModel) => Promise<boolean>;
    register: (payload: AuthUserModel) => Promise<boolean>;
    logout: () => void;
    token: string | null;
    user: AuthUserModel | null;
}

interface JwtPayload {
    sub: string;
    exp: number;
    [key: string]: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('UseAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const tokenFromStorage = localStorage.getItem(ELITE_TOKEN);
    const [token, setToken] = useState<string | null>(tokenFromStorage || null);

    const login = async (payload: AuthModel) => {
        const response = await restUtils.call<string>(`${CXT_PATH}/auth/login`, 'POST', payload);
        if (response) {
            setToken(response);
            localStorage.setItem(ELITE_TOKEN, response);
            return true;
        }
        return false;
    };

    const register = async (payload: AuthUserModel) => {
        return await restUtils.call<boolean>(`${CXT_PATH}/auth/registration`, 'POST', payload);
    };

    const logout = async () => {
        setToken(null);
        localStorage.removeItem(ELITE_TOKEN);
        delete axios.defaults.headers.common['Authorization'];
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);

    const isTokenValid = (token: string | null): boolean => {
        if (!token) {
            return false;
        }

        try {
            const decoded: JwtPayload = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                throw new Error('Token expired.');
            }
            return true;
        } catch (error) {
            logout();
            console.error('Token validation error : ', error);
            return false;
        }
    };

    const getloggedInUser = (token: string | null): AuthUserModel | null => {
        if (!token) {
            return null;
        }

        try {
            const decoded: JwtPayload = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                throw new Error('Token expired.');
            }
            const authUser = {
                username: decoded.sub,
                roles: decoded.roles
            } as AuthUserModel;
            return authUser;
        } catch (error) {
            logout();
            return null;
        }
    };

    const value = {
        isAuthenticated: isTokenValid(token),
        token,
        login,
        register,
        logout,
        user: getloggedInUser(token)
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
