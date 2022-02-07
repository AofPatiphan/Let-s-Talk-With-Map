import React, { useContext } from 'react';
import './conversation.css';
import { useNavigate } from 'react-router-dom';

function Conversation({ room }) {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex p-2 border-bottom border-warning"
            onClick={() => {
                navigate(`/messenger/${room.friendId}`);
            }}
        >
            <div className="pe-4">
                <img
                    className="profileCardPicture"
                    src={room.profileUrl}
                    alt=""
                />
            </div>
            <div style={{ width: '100%' }}>
                <div className="name">
                    <div>
                        <b>{room.username}</b>
                    </div>
                    <div>2 min</div>
                </div>
                <div style={{ color: '#C68E50' }}>{room.message}</div>
            </div>
        </div>
    );
}

export default Conversation;
