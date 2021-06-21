import { useState } from "react";

const client = new WebSocket('ws://localhost:8080');
client.sendEvent = e => client.send(JSON.stringify(e));
client.onopen = () => console.log('Server connected.');

const useChat = () => {
    const [sentences, setSentences] = useState([]);

    const sendMessage = (payload) => { 
        console.log("send message : ", payload);
        client.sendEvent({
            type: 'MESSAGE',
            data: payload,
        })
    };

    const chatToFriend = (payload) => {
        console.log("chat to friend : ", payload);

        client.sendEvent({
            type: 'CHAT',
            data: payload,
        })
    }

    const clearSentences = () => {
        setSentences([]);
    }

    const pushToSentence = (newSentence) => {
        console.log("push to sentence :", sentences, newSentence);
        setSentences([...sentences, newSentence]);
    }

    const onEvent = e => {
        const { type } = e
        switch (type) {
            case "CHAT": {
                console.log("receive CHAT: ", e.data.messages);
                setSentences(e.data.messages);
                break;
            }
            case "MESSAGE": {
                console.log("receive MESSAGE: ", e.data.message);
                pushToSentence(e.data.message);
                break;
            }
            default: break;
        }
    };

    client.onmessage = m => {
        console.log('m:', m)
        onEvent(JSON.parse(m.data))
    }

    return { sentences, sendMessage, chatToFriend, clearSentences };
};

export default useChat;