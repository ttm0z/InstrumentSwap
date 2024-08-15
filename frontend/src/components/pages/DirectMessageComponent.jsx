import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePicture from '../features/ProfilePicture';
import useWebSocket from '../hooks/useWebSocket';
import useGetUser from '../hooks/useGetUser';
import '../styles/DirectMessageComponent.css';

const DirectMessageComponent = () => {
    // Get sender
    const { user: sender, error: senderError, loading: senderLoading } = useGetUser(localStorage.getItem('username'));
    
    // Get recipient
    const { userid: recipientId } = useParams();
    const { user, error: userError, loading: userLoading } = useGetUser(null, recipientId);

    const [webSocketReady, setWebSocketReady] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    // Initialize WebSocket conditionally
    const { sendMessage, receiveMessage } = useWebSocket(sender?.user_id, recipientId, webSocketReady);

    useEffect(() => {
        if (!userLoading && !senderLoading && user && sender) {
            // Ensure WebSocket is only initialized after both users are loaded
            setWebSocketReady(true);
        }
    }, [userLoading, senderLoading, user, sender]);

    useEffect(() => {
        if (webSocketReady) {
            // Handle incoming messages
            receiveMessage((message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }
    }, [webSocketReady, receiveMessage]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            console.log("Sending message: ", newMessage);
            sendMessage(newMessage);
            setNewMessage(''); // Clear input after sending
        }
    };

    if (userLoading || senderLoading) return <p>Loading...</p>;
    if (userError || senderError) return <p>Error loading data</p>;

    return (
        <div className='chat-container'>
            <div className='message-box'>
                <div className='message-header'>
                    <ProfilePicture username={user.username}/> 
                    <p>{user.first_name} {user.last_name}</p>
                </div>
                <div className='messages'>
                    {messages.length > 0 ? ( 
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
