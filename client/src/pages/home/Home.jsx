import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import ProfileCard from '../../components/profile/ProfileCard';
import { UserContext } from '../../contexts/UserContext';
import './home.css';

function Home() {
    const { userData } = useContext(UserContext);
    const [allUserData, setAllUserData] = useState([]);

    useEffect(() => {
        const fetchAllUser = async (id) => {
            const res = await axios.get(`/user/all/${id}`);
            setAllUserData(res.data.users);
        };
        fetchAllUser(userData.id);
    }, []);

    return (
        <div className="homepage">
            {allUserData.map((item) => {
                return <ProfileCard item={item} key={item.id} />;
            })}
        </div>
    );
}

export default Home;
