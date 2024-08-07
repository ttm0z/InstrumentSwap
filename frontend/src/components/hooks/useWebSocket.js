import { useState, useEffect, useCallback } from 'react';

const useWebSocket = (senderId, recipientId) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        
        const ws = new WebSocket(`ws://localhost:8000/ws/direct/${recipientId}/${senderId}`);
    
        const getOrCreateConversation = async () => {
            
            try{
                const response = await axios.get(`http://localhost:8000/api/conversations/conversation/${recipientId}/${senderId}`);
                console.log(response.data);
            }   
            catch(error){
                console.log(error);
            }
                
            getOrCreateConversation()
        }

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
    
            // Implement reconnection logic
            setTimeout(() => {
                setSocket(new WebSocket(`ws://localhost:8000/ws/direct/${recipientId}/`));
            }, 5000); // Reconnect after 5 seconds
        };
    
        setSocket(ws);
    
        return () => {
            ws.close();
        };
    }, [senderId, recipientId]);
    

    const sendMessage = useCallback((text) => {
        if (socket && isConnected) {
            socket.send(JSON.stringify({ text }));
        }
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
