import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from '../hooks/useWebSocket';
import { getUserById } from '../services/userService'

// Need to get pfp & name for both users
// 
    


const DirectMessageComponent = () => {
    const user_param  = useParams();
    
    const user_id = getUserById(user_param.user_id);
    console.log( user_id);
    
    const [userData, setUserData] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { sendMessage, recieveMessage } = useWebSocket(user_id);

    useEffect(() => {

        recieveMessage(message => setMessages(prev => [...prev, message]));
    }, [user_id, recieveMessage]);  // Added recieveMessage to dependency array

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage(''); // Clear the input after sending
        }
    };

    return (
        <div className='chat-container'>
            <div className='contacts-bar'>
                {/* Contacts bar content */}
            </div>
            <div className='message-box'>
                <div>{userData.data}</div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
                <input 
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <div className='details-bar'>
                {/* Details bar content */}
            </div>
        </div>
    );
};

export default DirectMessageComponent;
