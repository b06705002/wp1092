import '../App.css'
import { Tabs, Input } from 'antd'
import { useState } from 'react'
import ChatModal from '../Components/ChatModal'
import useChatBox from '../hooks/useChatBox'
import ChatBox from '../Components/ChatBox'

import {
    CREATE_CHATBOX_MUTATION,
    CREATE_MESSAGE_MUTATION,
  } from '../graphql'
import { useMutation } from '@apollo/client';

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [activeKey, setActiveKey] = useState('')
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox(me, activeKey)

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);


    const addChatBox = () => { setModalVisible(true) }

    return (
        <>
            <div className="App-title">
                <h1>{me}'s Chat Room</h1>
            </div>
            <div className="App-messages">
                <Tabs 
                    type="editable-card" 
                    activeKey={activeKey}
                    onChange={(key) => setActiveKey(key)}
                    onEdit={(targetKey, action) => {
                        if (action === "add") addChatBox()
                        else if (action === "remove") setActiveKey(removeChatBox(targetKey))
                    }}
                >
                    {chatBoxes.map(({ friend, key }) => (
                            <TabPane tab={friend} key={key} closable={true}>
                                <ChatBox boxName={key} friend={friend} />
                            </TabPane>     
                        )
                    )}
                </Tabs>
                
                <ChatModal
                    visible={modalVisible}
                    onCreate={async ({ name }) => {
                        console.log("onCreate ChatModal for ", me, name);
                        await startChat({
                            variables: {
                                name1: me,
                                name2: name
                            },
                        });
                        setActiveKey(createChatBox(name))
                        setModalVisible(false)  // close the modal after successfully creating the chatbox
                    }}
                    onCancel={() => {
                        setModalVisible(false)
                    }}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: "error",
                            msg: "Please enter message."
                        })
                        return
                    } else if (activeKey === "") {
                        displayStatus({
                            type: "error", 
                            msg: "Please add a chatbox first."
                        })
                        return
                    }
                    sendMessage({
                        variables: {
                            chatBoxName: activeKey,
                            from: me,
                            body: msg
                        }
                    })
                    setMessageInput('')
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom