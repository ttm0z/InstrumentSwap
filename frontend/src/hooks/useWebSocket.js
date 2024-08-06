import { useState, useEffect, useCallback }  from 'react';

const useWebSocket = (recipientId) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/ws/messages/${recipientId}/`);

        ws.onopen = () => {
            console.log('WebSocket connection opened. ');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, message]);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:  ', error);
        };

        ws.onclose = () => {
            console.log('Websocket Connection closed')
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [recipientId]);

    const sendMessage = useCallback((text) => {
        if (socket) {
            socket.send(JSON.stringify({ text }));
        }
    }, [socket]);

    const recieveMessage = useCallback((callback) => {
        if (socket) {
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                callback(message);
            }
        }
    }, [socket]);

    return { sendMessage, recieveMessage, messages}

};
export default useWebSocket;