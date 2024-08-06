import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

const ChatRoom = () => {

    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);

        newSocket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => newSocket.close();
    }, []);

    const sendMessage = () => {
        socket.emit('messsage', input);
        setInput('')
    }

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

export default ChatRoom;