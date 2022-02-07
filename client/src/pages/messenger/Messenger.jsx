import React, { useContext } from 'react';
import Conversation from '../../components/conversation/Conversation';
import { ChatContext } from '../../contexts/ChatContext';
import { SocketContext } from '../../contexts/SocketContext';
import { UserContext } from '../../contexts/UserContext';
import './messenger.css';

function Messenger() {
    const { userData } = useContext(UserContext);
    const { fetchMessage } = useContext(SocketContext);
    const { chatRoom } = useContext(ChatContext);
    return (
        <div className="messengerpage">
            {chatRoom.map((item) => (
                <Conversation
                    room={item}
                    key={item.roomId}
                    userData={userData}
                    fetchMessage={fetchMessage}
                />
            ))}
        </div>
    );
}

export default Messenger;
