import React, { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

function ConfirmDeletePost({ item }) {
    const { deletePost } = useContext(PostContext);
    const handleSubmitDeletePost = (e) => {
        e.preventDefault();
        deletePost(item.id);
    };
    return (
        <div
            className="modal fade"
            id={`DeletePostModal${item.id}`}
            tabIndex="-1"
            aria-labelledby="DeletePostModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog ">
                <div className="modal-content postForm">
                    <form onSubmit={handleSubmitDeletePost}>
                        <div className="modal-header ">
                            <h5
                                className="modal-title postTitle"
                                id="DeletePostModalLabel"
                            >
                                Delete Post
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
                                <label className="col-form-label postTitle">
                                    Are you sure to delete this post?
                                </label>
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
                            <button
                                className="btn postBtn"
                                data-bs-dismiss="modal"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeletePost;
