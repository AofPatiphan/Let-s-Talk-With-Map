import React from 'react';
import './headerpublic.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function HeaderPublic({ publicPage }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClickChangePage = (e) => {
        if (location.pathname === '/') {
            navigate('/register');
        }
        if (location.pathname.includes('register')) {
            navigate('/');
        }
    };
    return (
        <div className="ps-4 pe-5 pt-3 fixed-top d-flex justify-content-between headerpublic">
            <div className="mt-2 " onClick={handleClickChangePage}>
                {`${location.pathname === '/' ? `Register` : `Sign in`}`}
            </div>
            <h1 className="pe-2 ">{`${
                location.pathname === '/' ? `Sign in` : `Create Account`
            }`}</h1>
            <h1>&nbsp;</h1>
        </div>
    );
}

export default HeaderPublic;
