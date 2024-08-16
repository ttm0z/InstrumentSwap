import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfilePicture from '../features/ProfilePicture';
import useWebSocket from '../hooks/useWebSocket';
import useGetUser from '../hooks/useGetUser';
import '../styles/DirectMessageComponent.css';

const DirectMessageComponent = () => {
    // Get sender
    const { user: sender, error: senderError, loading: senderLoading } = useGetUser(localStorage.getItem('username'));
    console.log("Sender: ", sender);

    // Get recipient
    const { userid: recipientId } = useParams();
    const { user: recipient, error: userError, loading: userLoading } = useGetUser(null, recipientId);
    console.log("Recipient: ", recipient);
    
    const [conversationId, setConversationId] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [webSocketReady, setWebSocketReady] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    // Initialize WebSocket
    const { sendMessage, receiveMessage } = useWebSocket(conversationId, senderId, recipientId, webSocketReady);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            console.log("Sending message: ", newMessage);
            sendMessage({ text: newMessage, sentByMe: true });
            setNewMessage(''); // Clear input after sending
        }
    };

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/conversations/conversation/${sender.user_id}/${recipientId}`);
                const data = response.data;
                setConversationId(data.id);
                setSenderId(sender.user_id);

                if (data.id) {
                    // Fetch messages once the conversationId is set
                    const messageFetch = await axios.get(`http://localhost:8000/api/messages/conversation/${data.id}/`);

                    setMessages(messageFetch.data);
                }

                setWebSocketReady(true);
            } catch (error) {
                console.error('Error fetching conversation:', error);
            }
        };

        if (sender && recipientId) {
            fetchConversation();
        }
    }, [sender, recipientId]);

    useEffect(() => {
        if (webSocketReady && conversationId) {
            receiveMessage((message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }
    }, [webSocketReady, conversationId, receiveMessage]);

    if (userLoading || senderLoading) return <p>Loading...</p>;
    if (userError || senderError) return <p>Error loading data</p>;

    return (
        <div className='chat-container'>
            <div className='message-box'>
                <div className='message-header'>
                    <ProfilePicture username={recipient.username}/> 
                    <p>{recipient.first_name} {recipient.last_name}</p>
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
