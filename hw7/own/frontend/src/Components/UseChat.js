import { useState } from 'react';

const client = new WebSocket('ws://localhost:8080')

const sendData = async (data) => {
    await client.send(JSON.stringify(data))
}

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const sendMessage = (payload) => {
        console.log(payload);
    }
    return {messages, status, sendMessage};
};

export default useChat;