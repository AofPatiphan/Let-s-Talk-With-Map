import axios from '../config/axios';
import { createContext, useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import * as localStorageService from '../services/localStorage';
import { API_ENDPOINT_URL } from '../config/env';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';

const UserContext = createContext();

function UserContextProvider(props) {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState('');
    const [socket, setSocket] = useState(null);

    // Get data profile
    const token = localStorage.getItem('token');
    const fetchUser = async (tokenInput) => {
        const a = jwtDecode(token || tokenInput);
        const res = await axios.get(`/user/${a.username}`);
        setUserData(res.data.user);
    };
    useEffect(() => {
        if (token) {
            const newSocket = io.connect(API_ENDPOINT_URL, {
                query: {
                    token: localStorageService.getToken(),
                },
            });

            setSocket(newSocket);
            fetchUser();
        }
    }, [token]);

    // get About for all user

    if (!userData) {
        return <></>;
    }

    return (
        <UserContext.Provider
            value={{
                userData,
                fetchUser,
                socket,
                setSocket,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
export { UserContext };
