import { useState } from 'react';

const client = new WebSocket('ws://localhost:8080')

const sendData = async (data) => {
    await client.send(JSON.stringify(data))
}

const splitName = (key) => {
    return key.split('_')
}

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const sendMessage = (payload) => {
        const nameArray = splitName(payload.key);
        sendData({type: 'MESSAGE', data: {name: nameArray[0], to: nameArray[1], body: payload.body}});
    }
    const setChatBox = (key) => {
        sendData({type: 'CHAT', data: {name: key.me, to: key.friend}});
    }
    client.onmessage = (byteString) => {
        const {data} = byteString;
        const {type: task, data: {payload}} = JSON.parse(data)
        switch(task) {
            case 'CHAT':
                setMessages(() => [...payload]);
                break;
            case 'MESSAGE':
                setStatus(() => new Object(payload));
                break;
            default:
                break;
        }
    } 
    return {messages, status, sendMessage, setChatBox};
};

export default useChat;