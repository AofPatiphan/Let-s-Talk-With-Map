import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import './logoutform.css';

function LogOutForm() {
    const { logout } = useContext(AuthContext);

    return (
        <div
            className="modal fade"
            id="LogoutModal"
            tabIndex="-1"
            aria-labelledby="LogoutModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog ">
                <div className="modal-content postForm">
                    <form onSubmit={logout}>
                        <div className="modal-header ">
                            <h5
                                className="modal-title postTitle"
                                id="LogoutModalLabel"
                            >
                                Logout
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure to log out ?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                className="btn postBtn"
                                data-bs-dismiss="modal"
                            >
                                Log out
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogOutForm;
