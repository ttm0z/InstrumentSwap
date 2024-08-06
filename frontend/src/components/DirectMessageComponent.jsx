import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';

const DirectMessageComponent = () => {

    const { recipientId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { sendMessage, recieveMessage } = useWebSocket(recipientId)

    useEffect(() => {
        fetchMessages(recipientId).then(initialMessages => setMessages(initialMessages));

        recieveMessage(message => setMessages(prev => [...prev, message]));
    }, [recipientId]);


    return(
        <div className='chat-container'>
            <div className='contacts-bar'>

            </div>
            <div className='message-box'>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>

            <div className='details-bar'></div>
        </div>
    )
}

export default DirectMessageComponent;