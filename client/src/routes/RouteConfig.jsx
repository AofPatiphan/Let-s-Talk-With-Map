import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import EditProfile from '../pages/editprofile/EditProfile';
import Home from '../pages/home/Home';
import Messenger from '../pages/messenger/Messenger';
import Profile from '../pages/profile/Profile';
import MainLayout from '../components/layouts/mainlayout/MainLayout';
import PublicLayout from '../components/layouts/publiclayout/PublicLayout';
import Login from '../components/auths/login/Login';
import Register from '../components/auths/register/Register';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Footer from '../components/layouts/footer/Footer';
import PostContextProvider from '../contexts/PostContext';
import UserContextProvider from '../contexts/UserContext';
import ChatContextProvider from '../contexts/ChatContext';
import SocketContextProvider from '../contexts/SocketContext';
import Chat from '../pages/chat/Chat';
import Search from '../pages/search/Search';

const routes = {
    guest: [
        { path: '/', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '*', element: <Navigate to="/" replace={true} /> },
    ],
    user: [
        { path: '/', element: <Home /> },
        { path: '/profile/:username', element: <Profile /> },
        { path: '/search', element: <Search /> },
        { path: '/about', element: <EditProfile /> },
        { path: '/messenger/', element: <Messenger /> },
        { path: '/messenger/:id', element: <Chat /> },
        { path: '*', element: <Navigate to="/" replace={true} /> },
    ],
};
function RouteConfig() {
    const { user, role } = useContext(AuthContext);

    if (role == 'user' && !user) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <>
            {role == 'user' ? (
                <>
                    <UserContextProvider>
                        <PostContextProvider>
                            <SocketContextProvider>
                                <ChatContextProvider>
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={<MainLayout />}
                                        >
                                            {routes[role].map((item) => (
                                                <Route
                                                    path={item.path}
                                                    element={item.element}
                                                    key={item.path}
                                                />
                                            ))}
                                        </Route>
                                    </Routes>
                                </ChatContextProvider>
                            </SocketContextProvider>
                        </PostContextProvider>
                        <Footer />
                    </UserContextProvider>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<PublicLayout />}>
                        {routes[role].map((item) => (
                            <Route
                                path={item.path}
                                element={item.element}
                                key={item.path}
                            />
                        ))}
                    </Route>
                </Routes>
            )}
        </>
    );
}

export default RouteConfig;
