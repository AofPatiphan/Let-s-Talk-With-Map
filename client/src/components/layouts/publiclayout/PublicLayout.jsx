import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderPublic from '../header/HeaderPublic';
import './publiclayout.css';

function PublicLayout() {
    const [publicPage, setPublicPage] = useState('login');
    return (
        <>
            <HeaderPublic
                publicPage={publicPage}
                setPublicPage={setPublicPage}
            />
            <Outlet />
        </>
    );
}

export default PublicLayout;
