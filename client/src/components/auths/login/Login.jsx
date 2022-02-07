import React from 'react';
import './login.css';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

function LoginBox() {
    const { email, setEmail, password, setPassword, handleSubmitLogin } =
        useContext(AuthContext);

    return (
        <div className="loginform d-flex justify-content-center align-items-center">
            <div className="loginformcontainer p-5">
                <form onSubmit={handleSubmitLogin}>
                    <div className="mt-2">
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label form-login-label"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control Input"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label form-login-label"
                            >
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control Input"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn login-button">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginBox;
