import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import useChatBox from "../hooks/useChatBox";
import useChat from '../hooks/useChat';
import ChatModal from '../components/ChatModal';

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");

    const addChatBox = () => { setModalVisible(true); };
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
    const { sentences, sendMessage, chatToFriend, clearSentences } = useChat();

    const keyToTo = (key) => {
        let to = key.split("_")[0];
        if(to === me)
            to = key.split("_")[1];
        return to;
    }

    useEffect(() => {
        if(activeKey !== "")
        {
            chatToFriend({ 
                name: me, 
                to: keyToTo(activeKey),
            });
        }
        else
        {
            clearSentences();
        }
    }, [activeKey]);

    return (
        <div className="mid-box"> 
            <div className="App-title">
                <h1>{me}'s Chat Room</h1>
            </div>
            <div className="App-messages">
                <Tabs type="editable-card"
                    activeKey={activeKey}
                    onChange={(key) => { setActiveKey(key); }}
                    onEdit={(targetKey, action) => {
                        if (action === "add") addChatBox();
                        else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
                    }}
                >
                    {chatBoxes.map((
                        { friend, key, chatLog }) => {
                            return (
                                <TabPane tab={friend} key={key} closable={true}>
                                    <p>{friend}'s chatbox.</p>
                                </TabPane>
                        );})}
                </Tabs>
            </div>
            <div className="chatBox">
                {sentences.map((message, i)=>{
                    if(me===message.name)
                        return (
                            <div key={i} className="line own">
                                <p>{message.name} : {message.body}</p>
                            </div>
                        )
                    else
                        return (
                            <div key={i} className="line other">
                                <p>{message.body} : {message.name}</p>
                            </div>
                        )
                })}
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) => 
                setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder=
                "Enter message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: "error",
                            msg: "Please enter message.",
                        });
                        return;
                    } else if (activeKey === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please add a chatbox first.",
                        });
                        setMessageInput("");
                        return;
                    }
                    sendMessage({ 
                        name: me, 
                        to: keyToTo(activeKey), 
                        body: msg
                    });
                    setMessageInput("");
                }}
            ></Input.Search>
            <ChatModal
                visible={modalVisible}
                onCreate={({ name }) => {
                    let newKey = createChatBox(name, me);
                    if(!newKey){
                        displayStatus({
                            type: "error",
                            msg: `${name}'s chat box has already opened.`,
                        });
                    }
                    else
                    {
                        setActiveKey(newKey);
                        // chatToFriend({ 
                        //     name: me, 
                        //     to: name,
                        // });
                    }
                    setModalVisible(false);
                }}
                onCancel={() => { setModalVisible(false); }}
            />
        </div>
    );
};
export default ChatRoom;