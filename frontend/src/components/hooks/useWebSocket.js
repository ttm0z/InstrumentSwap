import { useState, useEffect, useCallback } from 'react';
import {initConversation} from '../services/conversationService';
const useWebSocket = (senderId, recipientId) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [conversation, setConversation] = useState(null);
    
    useEffect(() => {
        
        // fetch conversation id
        setConversation(initConversation(senderId, recipientId));
        console.log("initializing websocket connection\n")
        const ws = new WebSocket(`ws://localhost:8000/ws/direct/${senderId}/${recipientId}`);
        console.log("\n")
        

        ws.onopen = () => {
            console.log('WebSocket connection opened.');
            setIsConnected(true);
        };
    
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, message]);
        };
    
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    
        ws.onclose = (event) => {
            console.log('WebSocket connection closed:', event.reason);
            setIsConnected(false);
        };
    
        setSocket(ws);
        
    
        return () => {
            ws.close();
        };
    }, [senderId, recipientId]);
    

    const sendMessage = useCallback((text) => {
        if (socket && isConnected) {
            socket.send(JSON.stringify({ text, senderId, recipientId }));
            console.log("sending: ", text)
        }
        else console.log("message not sent")
    }, [socket, isConnected]);

    const receiveMessage = useCallback((callback) => {
        if (socket) {
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                callback(message);
            }
        }
    }, [socket]);

    return { sendMessage, receiveMessage, messages, isConnected };
};

export default useWebSocket;
