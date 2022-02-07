import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { PostContext } from '../../contexts/PostContext';
import ConfirmDeletePost from './ConfirmDeletePost';
import './postcard.css';
import UpdatePostForm from './UpdatePostForm';

function PostCard({ item }) {
    const { userData } = useContext(UserContext);
    const { fetchPost } = useContext(PostContext);
    const { username } = useParams();
    const [isLike, setIsLike] = useState(
        item.Likes.findIndex((item) => item.userId === userData.id) !== -1
    );

    const likePost = async () => {
        try {
            const res = await axios.post(`/post/like/${item.id}`);
            setIsLike(true);
            fetchPost(username);
        } catch (err) {
            console.log(err.message);
        }
    };

    const unLikePost = () => {
        axios.delete(`/post/like/${item.id}`).then((res) => {
            setIsLike(false);
            fetchPost(username);
        });
    };

    return (
        <>
            <div className="postCard">
                <div className="postProfilePicture">
                    <img src={item.User.profileUrl} alt="Profile Img" />
                </div>
                <div className="postcontainer">
                    <div className="topPost">
                        <div className="postUsername">{item.User.username}</div>
                        {userData.username === username ? (
                            <div className="dropdown">
                                <button
                                    className="btn postTitle"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-three-dots"></i>
                                </button>

                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuLink"
                                >
                                    <li>
                                        <button
                                            className="btnPost btn dropdown-item"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#EditPostModal${item.id}`}
                                        >
                                            Edit
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="btnPost btn dropdown-item"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#DeletePostModal${item.id}`}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    {item.caption &&
                    item.pictureUrl &&
                    !item.caption.includes('https://www.youtube.com') ? (
                        <>
                            <div className="postContent">{item.caption}</div>
                            <div className="postContent postpicture">
                                <img
                                    src={item.pictureUrl}
                                    alt="Post picture"
                                    className="postpicture"
                                />
                            </div>
                        </>
                    ) : item.caption &&
                      !item.pictureUrl &&
                      !item.caption.includes('https://www.youtube.com') ? (
                        <div className="postContent">{item.caption}</div>
                    ) : !item.caption && item.pictureUrl ? (
                        <div className="postContent postpicture">
                            <img
                                src={item.pictureUrl}
                                alt="Post picture"
                                className="postpicture"
                            />
                        </div>
                    ) : item.caption.includes('https://www.youtube.com') &&
                      !item.pictureUrl ? (
                        <div style={{ padding: '5px', width: '100%' }}>
                            <iframe
                                width="100%"
                                src={`https://www.youtube.com/embed/${
                                    item.caption.split('?v=')[1]
                                }`}
                            ></iframe>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="postButtom ">
                        <button
                            className="btn btnPost"
                            onClick={isLike ? unLikePost : likePost}
                        >
                            <i
                                className={`bi bi-heart${
                                    isLike ? '-fill' : ''
                                }`}
                            ></i>
                        </button>
                        <div className="countLike btnPost">
                            {item.Likes.length} Likes
                        </div>
                    </div>
                </div>
            </div>
            <UpdatePostForm item={item} />
            <ConfirmDeletePost item={item} />
        </>
    );
}

export default PostCard;
