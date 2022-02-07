import axios from '../../config/axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PostContext } from '../../contexts/PostContext';

function UpdatePostForm({ item }) {
    const { updatePost } = useContext(PostContext);
    const { loading, setLoading } = useContext(AuthContext);
    const [editText, setEditText] = useState(item.caption);
    const [editPicture, setEditPicture] = useState(item.pictureUrl);
    const handleSubmitEditPost = (e) => {
        e.preventDefault();
        updatePost(item.id, editText, editPicture);
    };

    const handleUpdateFileInputChange = async (e) => {
        setLoading(true);
        if (!e.target.value) return;

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = async () => {
            await uploadImage(reader.result);
        };
        e.target.value = '';
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            const res = await axios.post('/upload', {
                data: base64EncodedImage,
            });
            setEditPicture(res.data.url);
            setLoading(false);
        } catch (err) {
            alert('File size too large.');
        }
    };

    return (
        <div
            className="modal fade"
            id={`EditPostModal${item.id}`}
            tabIndex="-1"
            aria-labelledby="EditPostModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog ">
                <div className="modal-content postForm">
                    <form onSubmit={handleSubmitEditPost}>
                        <div className="modal-header ">
                            <h5
                                className="modal-title postTitle"
                                id="EditPostModalLabel"
                            >
                                Edit Post
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {editPicture ? (
                                <div className="previewpostphoto">
                                    <img
                                        src={editPicture}
                                        alt=""
                                        className="previewpostphoto"
                                    />
                                    <button
                                        type="button"
                                        className="btn deletePhotoPreview"
                                        onClick={() => setEditPicture('')}
                                    >
                                        <i className="bi bi-x-circle-fill"></i>
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="mb-3">
                                <label
                                    htmlFor={`updatepost${item.id}`}
                                    className="col-form-label postTitle"
                                >
                                    Caption :
                                </label>
                                <textarea
                                    className="form-control"
                                    id={`updatepost${item.id}`}
                                    value={editText}
                                    onChange={(e) =>
                                        setEditText(e.target.value)
                                    }
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor={`updateFile${item.id}`}
                                    className="form-label"
                                >
                                    Select your photo :
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id={`updateFile${item.id}`}
                                    onChange={handleUpdateFileInputChange}
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
                            {!loading ? (
                                <button
                                    className="btn postBtn"
                                    data-bs-dismiss="modal"
                                >
                                    Submit Edit Post
                                </button>
                            ) : (
                                <button
                                    className="btn postBtn"
                                    data-bs-dismiss="modal"
                                    disabled
                                >
                                    Submit Edit Post
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePostForm;
