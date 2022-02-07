import axios from '../../config/axios';
import React, { useContext, useState } from 'react';
import './editprofileform.css';
import { UserContext } from '../../contexts/UserContext';

function EditProfileForm({ fetchUser }) {
    const { userData } = useContext(UserContext);
    const [date, setDate] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [profileCaption, setProfileCaption] = useState('');

    const handleSubmitUpdateProfile = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.put(`/about/${userData.id}`, {
                age: age,
                birthDate: date,
                gender: gender,
                caption: profileCaption,
            });
            fetchUser();
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div
            className="modal fade "
            id="EditProfileModal"
            tabIndex="-1"
            aria-labelledby="EditProfileModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-fullscreen ">
                <form
                    className="modal-content editProfileForm"
                    onSubmit={handleSubmitUpdateProfile}
                >
                    <div className="modal-header">
                        <h5
                            className="modal-title editProfileTitle"
                            id="EditProfileModalLabel"
                        >
                            Edit Profile
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="dateofbirth" className="form-label">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateofbirth"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                                Age
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option defaultValue>
                                    Open this select menu
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="caption" className="form-label">
                                Caption
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="caption"
                                value={profileCaption}
                                onChange={(e) =>
                                    setProfileCaption(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {date || age || profileCaption || gender ? (
                            <button
                                className="btn saveBtn"
                                data-bs-dismiss="modal"
                            >
                                Save changes
                            </button>
                        ) : (
                            <button
                                className="btn saveBtn"
                                data-bs-dismiss="modal"
                                disabled
                            >
                                Save changes
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfileForm;
