import React from 'react';
import { Outlet } from 'react-router-dom';
import PostForm from '../../post/PostForm';
import HeaderMain from '../header/HeaderMain';
import './mainlayout.css';

function MainLayout() {
    return (
        <div>
            <HeaderMain />
            <PostForm />
            <Outlet />
        </div>
    );
}

export default MainLayout;
