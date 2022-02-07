import { useContext } from 'react';
import './register.css';
import { AuthContext } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from '../../../config/axios';

function RegisterForm() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        confirmPassword,
        setConfirmPassword,
        handleSubmitRegister,
        username,
        setUsername,
        setLoading,
        loading,
        setImageUrl,
    } = useContext(AuthContext);

    const handleFileInputChange = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!e.target.value) return;

        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            const res = await axios.post('/upload/post', {
                data: base64EncodedImage,
            });
            setImageUrl(res.data.url);
            setLoading(false);
        } catch (err) {
            alert('File size too large.');
        }
    };

    return (
        <div className="registerform d-flex justify-content-center align-items-center">
            <div className="registerformcontainer p-5">
                <form onSubmit={handleSubmitRegister}>
                    <div className="mt-2">
                        <div className="input-group mb-1 ">
                            <input
                                type="file"
                                className="form-control Input"
                                style={{ borderRadius: '8px' }}
                                onChange={handleFileInputChange}
                            />
                        </div>
                        <div className="mb-1 ">
                            <label className="form-label form-login-label">
                                First name
                            </label>
                            <input
                                type="text"
                                className="form-control Input"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-1 ">
                            <label className="form-label form-login-label">
                                Last name
                            </label>

                            <input
                                type="text"
                                className="form-control Input"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-1 ">
                            <label className="form-label form-login-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control Input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-1 ">
                            <label className="form-label form-login-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control Input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-1  ">
                            <label className="form-label form-login-label">
                                password
                            </label>
                            <input
                                type="password"
                                className="form-control Input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="  ">
                            <label
                                htmlFor="firstName"
                                className="form-label form-login-label"
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                className="form-control Input"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-2 form-check"></div>
                        {!loading ? (
                            <button
                                type="submit"
                                className="btn register-button "
                            >
                                Register
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn register-button"
                                disable="true"
                            >
                                Register
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
