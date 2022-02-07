import axios from '../../config/axios';
import React, { useState, useEffect, useContext } from 'react';
import PostCard from '../../components/post/PostCard';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { useParams } from 'react-router-dom';
import './profile.css';
import { PostContext } from '../../contexts/PostContext';
import EditProfileForm from '../../components/profile/EditProfileForm';
import { AuthContext } from '../../contexts/AuthContext';
import LogOutForm from '../../components/auths/logout/LogOutForm';

function Profile() {
    const { aboutPerson } = useContext(AuthContext);
    const { fetchPost, post } = useContext(PostContext);
    const [person, setPerson] = useState({});
    const { username } = useParams();

    // Fetch User Data
    const fetchUser = async () => {
        const res = await axios.get(`/user/${username}`);
        setPerson(res.data.user);
    };
    useEffect(() => {
        fetchUser(username);
    }, [username]);

    //Fetch Post
    useEffect(() => {
        fetchPost(username);
    }, [username]);

    if (!person || !post) {
        return <></>;
    }

    return (
        <div className="profile">
            <ProfileHeader person={person} />
            <EditProfileForm fetchUser={fetchUser} />
            <LogOutForm />
            {post.map((item) => {
                return <PostCard item={item} key={item.id} />;
            })}
        </div>
    );
}

export default Profile;
