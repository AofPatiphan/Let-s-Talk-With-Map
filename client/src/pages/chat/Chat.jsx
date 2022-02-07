import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import { UserContext } from '../../contexts/UserContext';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import './chat.css';
import Message from '../../components/message/message';
import { ChatContext } from '../../contexts/ChatContext';

function Chat() {
    const [inputText, setInputText] = useState('');

    const { userData, socket } = useContext(UserContext);
    const { fetchFriendList } = useContext(ChatContext);
    const { sendMessage, messages, fetchMessage, typingStatus, typingName } =
        useContext(SocketContext);
    const chatboxRef = useRef(null);

    const handleClickSend = (e) => {
        e.preventDefault();
        sendMessage({ message: inputText, userId: userData.id });
        setInputText('');
        fetchFriendList();
    };

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            fetchMessage(id);
        }
        fetchFriendList();
    }, [id]);

    useEffect(() => {
        chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
    });

    const handleChangeTyping = (e) => {
        setInputText(e.target.value);
        socket.emit('typing');
    };

    return (
        // <div className="chatBox">
        <form onSubmit={handleClickSend}>
            <div className="chatBoxTop" ref={chatboxRef}>
                {messages.map((item, index) => {
                    return (
                        <Message
                            message={item}
                            key={index}
                            own={userData.id === item.userId}
                            userData={userData}
                        />
                    );
                })}
            </div>
            <div>{typingStatus ? `${typingName} is typing ...` : ''}</div>
            <div className="chatBoxBottom">
                <input
                    className="chatMessageInput"
                    placeholder="write something..."
                    value={inputText}
                    onChange={handleChangeTyping}
                ></input>
                <button className="chatSubmitButton btn">
                    <i className="bi bi-plus-circle"></i>
                </button>
            </div>
        </form>
        // </div>
    );
}

export default Chat;
