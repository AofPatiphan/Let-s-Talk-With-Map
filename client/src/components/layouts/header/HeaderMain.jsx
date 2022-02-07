import React, { useState } from 'react';
import './headermain.css';
import { useLocation, useParams } from 'react-router-dom';
import axios from '../../../config/axios';

function HeaderMain() {
    const location = useLocation();
    const [navName, setNavName] = useState('');
    const { id } = useParams();
    const getUser = async () => {
        try {
            const res = await axios.get(`/user/me/${id}`);
            setNavName(res.data.user);
        } catch (err) {
            console.log(err.message);
        }
    };
    if (location.pathname === `/messenger/${id}`) {
        getUser();
    }
    return (
        <>
            <div className="ps-4 pe-4 pt-3 fixed-top d-flex justify-content-between headermain">
                {location.pathname === '/' ? (
                    <>
                        <h5>
                            <b>Look Around</b>
                        </h5>
                        <h5>
                            <b>Filter</b>
                        </h5>
                    </>
                ) : location.pathname === '/messenger' ? (
                    <>
                        <h5>
                            <b>Chat</b>
                        </h5>
                    </>
                ) : location.pathname === '/search' ? (
                    <>
                        <h5>
                            <b>Map</b>
                        </h5>
                        <h5>
                            <b>Filter</b>
                        </h5>
                    </>
                ) : location.pathname.includes('profile') ? (
                    <>
                        <h5>
                            <b>Profile</b>
                        </h5>
                        <div>
                            <button
                                type="button"
                                className="btn addPostBtn"
                                data-bs-toggle="modal"
                                data-bs-target="#PostModal"
                            >
                                <i className="bi bi-pencil-square"></i>
                            </button>
                        </div>
                    </>
                ) : location.pathname === `/messenger/${id}` ? (
                    <h5>
                        <b>{navName.username}</b>
                    </h5>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default HeaderMain;
