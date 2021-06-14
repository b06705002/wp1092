import '../App.css';
import { useState, useEffect } from 'react';
import { Tabs, Input } from 'antd';
import ChatModal from '../Components/ChatModal';
import useChat from '../Components/UseChat';
import Chatlog from '../Components/Chatlog';
import { useMutation } from '@apollo/react-hooks'
import {
    CREATE_CHATBOX_MUTATION,
  } from '../graphql';

const { TabPane } = Tabs;

const ChatRoom = ({me, displayStatus}) => {
    const {messages, status, sendMessage, setChatBox } = useChat()
    const [chatBoxes, setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState("")
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const addChatBox = () => { setModalVisible(true); };
    const createChatBOx = (friend) => {
        // const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
        const newKey = `${me}_${friend}`;
        if (chatBoxes.some(({key}) => key === newKey)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog});
        setChatBoxes(newChatBoxes);
        setChatBox({me, friend});
        // console.log(messages)
        setActiveKey(newKey);
    }
    const removechatBox = (targetKey) => {
        let newActivityKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({key}, i) => {
            if (key === targetKey)
                lastIndex = i - 1;
        })
        const newChatBoxes = chatBoxes.filter(
            (chatBox) => chatBox.key !== targetKey)
        if (newChatBoxes.length) {
            if (newActivityKey === targetKey) {
                if (lastIndex >= 0) 
                    newActivityKey = newChatBoxes[lastIndex].key;
                else
                    newActivityKey = newChatBoxes[0].key;
            }
        }
        else 
            newActivityKey = '';
        setChatBoxes(newChatBoxes);
        setActiveKey(newActivityKey);

    }
    
    const setChatLog = (messages) => { 
        let newChatBoxes = chatBoxes.slice() 
        for (let i = 0; i < newChatBoxes.length; i++) { 
            if (newChatBoxes[i].key === activeKey) { 
                newChatBoxes[i].chatLog = messages 
            } 
        }
        setChatBoxes(newChatBoxes) 
    }

    const setNewMessage = (status) => { 
        let newChatBoxes = chatBoxes.slice()
        for (let i = 0; i < newChatBoxes.length; i++) { 
            if (newChatBoxes[i].key === activeKey) { 
                newChatBoxes[i].chatLog.push(status)
            } 
        }
        setChatBoxes(newChatBoxes) 
    }

    useEffect(() => setChatLog(messages.slice()), [messages]);

    useEffect(() => setNewMessage(new Object(status)), [status]);

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);

    return(
    <>
        <div className='App-title'>
            <h1>{me}'s Chat Room</h1>
        </div>
        <div className='App-messages'>
            <Tabs 
                type='editable-card'
                activeKey={activeKey}
                onChange={(key) => { setActiveKey(key);}}
                onEdit={(targetKey, action) => {
                    if (action === 'add')
                        addChatBox();
                    else if (action === 'remove')
                        removechatBox(targetKey);
                }}    
            >
                {chatBoxes.map((
                    {friend, key, chatLog}) => {
                        return (
                            <TabPane tab={friend} key={key} closable={true}>
                                {chatLog.length != 0 ? (<Chatlog content={chatLog} friend={friend} me={me}/>) :(<p>{friend}'s chatbox.</p>)}
                            </TabPane>
                        );
                    }
                )}
            </Tabs>
            <ChatModal
                visible={modalVisible}
                onCreate={async (friend) => {
                    // createChatBOx(name);
                    const newKey = `${me}_${friend}`;
                    if (chatBoxes.some(({key}) => key === newKey)) {
                        throw new Error(friend + "'s chat box has already opened.");
                    }
                    const newChatBoxes = [...chatBoxes];
                    const chatLog = [];
                    newChatBoxes.push({ friend, key: newKey, chatLog});
                    setChatBoxes(newChatBoxes);
                    // setChatBox({me, friend});
                    // console.log(messages)
                    setActiveKey(newKey);
                    const data = await startChat({
                        name1: {me},
                        name2: {friend }   
                    })
                    console.log(data)
                    setModalVisible(false);
                }}
                onCancel={() => {
                    setModalVisible(false)
                }}
            />
        </div>
            <Input.Search
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                enterButton='Send'
                placeholder='Enter message here...'
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter message.',
                        });
                        return;
                    }
                    else if (activeKey === ''){
                        displayStatus({
                            type: 'error',
                            msg: 'Please add a chatbox first.',
                        });
                        setMessageInput('');
                        return;
                    }
                    sendMessage({key: activeKey, body: msg});
                    setMessageInput('');
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom;