import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePicture from '../features/ProfilePicture';
import useWebSocket from '../hooks/useWebSocket';
import useConversation from '../hooks/useConversation';
import useGetUser from '../hooks/useGetUser';
import axios from 'axios';
import '../styles/DirectMessageComponent.css';

const DirectMessageComponent = () => {
    
    // Get sender
    const { user: sender, error: senderError, loading: senderLoading } = useGetUser(localStorage.getItem('username'));
    
    // Get recipient
    const { userid: user_id } = useParams();
    const { user, error: userError, loading: userLoading } = useGetUser(null, user_id);

    const [conversation, setConversation] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    
    // Messages and states
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    
    //const { conversation, error, loading } = useConversation(user_id,user_id,);
    const { sendMessage, receiveMessage } = useWebSocket(user_id, user_id);
    useEffect(() => {
        if(!userLoading){

        }
    }, user)

    useEffect(() => {
        
    },);

    const handleSendMessage = async () => {
        console.log("sending message: ", newMessage);
        sendMessage(newMessage);
    };

    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error loading data</p>;

    return (
        <div className='chat-container'>
            <div className='contacts-bar'>
                {/* Contacts bar content */}
            </div>
            <div className='message-box'>
                <div className='message-header'>
                    <ProfilePicture username={user.username}/> 
                    {user.first_name} 
                </div>
                <div className='messages'>
                    {messages && messages.length > 0 ? ( 
                        messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sentByMe ? 'sent' : 'received'}`}>
                                {msg.text}
                            </div>
                        ))
                    ) : (
                        <p>No messages yet.</p> 
                    )}
                </div>
                <div className='input-area'>
                    <input 
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
            <div className='details-bar'>
                {/* Details bar content */}
            </div>
        </div>
    );
};

export default DirectMessageComponent;
