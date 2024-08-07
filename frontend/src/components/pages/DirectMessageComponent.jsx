import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePicture from '../features/ProfilePicture';
import useWebSocket from '../hooks/useWebSocket';
import useGetUser from '../hooks/useGetUser';
import axios from 'axios';  // Ensure axios is installed and imported
import '../styles/DirectMessageComponent.css';

const DirectMessageComponent = () => {
    const params = useParams();
    const user_id = params.userid;

    const { user: sender, error: senderError, loading: senderLoading } = useGetUser(localStorage.getItem('username'));
    const { user, error, loading } = useGetUser(null, user_id);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationId, setConversationId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // WebSocket hook, initialize only after conversation ID is set
    const { sendMessage, receiveMessage } = useWebSocket(sender?.user_id, user_id);

    useEffect(() => {
        if (sender && !senderLoading && user && !loading) {
            
            const checkConversation = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/conversations/conversation/${sender.user_id}/${user_id}/`);
                    if (response.data.exists) {
                        setConversationId(response.data.conversationId);
                        setMessages(response.data.messages);
                    } else {
                        // Create a new conversation if none exists
                        const createResponse = await axios.post('/api/conversations/conversation/', {
                            user1: sender.user_id,
                            user2: user_id
                        });
                        setConversationId(createResponse.data.conversationId);
                        setMessages([]);
                    }
                } catch (error) {
                    console.error('Error fetching or creating conversation:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            checkConversation();
        }
    }, [sender, senderLoading, user, loading, user_id]);

    useEffect(() => {
        if (conversationId) {
            // Establish WebSocket connection once conversation ID is set
            receiveMessage(message => setMessages(prev => [...prev, message]));
        }
    }, [conversationId, receiveMessage]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage('');
        }
    };

    if (isLoading || loading || senderLoading) return <p>Loading...</p>;
    if (error || senderError) return <p>Error loading data</p>;

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
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sentByMe ? 'sent' : 'received'}`}>
                            {msg.text}
                        </div>
                    ))}
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
