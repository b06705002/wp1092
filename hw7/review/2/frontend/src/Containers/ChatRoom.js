import "../App.css";
import { useState } from "react"; import { Tabs, Input, message } from "antd";
import ChatModal from "../Components/ChatModal"
import useChat from "../hook/useChat"

const { TabPane } = Tabs; 
const ChatRoom = ({ me, displayStatus, server }) => {
    // const [chatBoxes, setChatBoxes] = useState(
    //     [ { 
    //         friend: "Mary", 
    //         key: `${me}_Mary`, 
    //         chatLog: [{'name': "Mary", "body" : "hello"}, {'name': "Kevin", "body" : "hi"}] 
    //     },
    //     { 
    //         friend: "Peter", 
    //         key: `${me}_Peter`,
    //         chatLog: [{'name': "Kevin", "body" : "hello"}, {'name': "Peter", "body" : "hi"}] 
    //     } 
    // ]);
    const [chatBoxes, setChatBoxes] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("")
    // const { status, sendMessage } = useChat();
    
    server.onmessage = (m) => {
        onEvent(JSON.parse(m.data));
    };
    server.sendEvent = (e) => server.send(JSON.stringify(e));

    const startChat = (friend) => {
        const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        server.sendEvent({
            type: 'CHAT',
            data: { to: friend, name: me },
        });
    };

    const sendMessage = (payload) => {
        var names = payload.key.split('_');
        var friend = (names[0] == me) ? names[1]:names[0];

        server.sendEvent({
            type: 'MESSAGE',
            data: { to: friend, name: me, body: payload.body},
        });
    };

    const onEvent = (e) => {
        const { type } = e;

        switch (type) {
          case 'CHAT': {
            // messages = e.data.messages;
            // const newChatBoxes = [...chatBoxes];
            // for (i = 0; i < newChatBoxes.length; i++) {
            //     if (newChatBoxes[i].friend == e.friend) {
            //         newChatBoxes[i].chatLog = e.data.messages;
            //         break;
            //     }
            // }
            // setChatBoxes(newChatBoxes)
            createChatBox(e.friend, e.data.messages);
            break;
          }
          case 'MESSAGE': {
            const newChatBoxes = [...chatBoxes];
            for (var i = 0; i < newChatBoxes.length; i++) {
                if (newChatBoxes[i].friend == e.from) {
                    newChatBoxes[i].chatLog.push(e.data.message);
                    break;
                } else if (newChatBoxes[i].friend == e.to) {
                    newChatBoxes[i].chatLog.push(e.data.message);
                    break;
                }
            }
            setChatBoxes(newChatBoxes);
            break;
          }
        }

        // renderMessages();
    };
    

    const addChatBox = () => { setModalVisible(true); };
    const createChatBox = (friend, message) => {
        const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
        // if (chatBoxes.some(({ key }) => key === newKey)) {
        //     throw new Error(friend + "'s chat box has already opened.");
        // }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog: message });
        setChatBoxes(newChatBoxes);
        setActiveKey(newKey);
    };
    const removeChatBox = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) { 
                lastIndex = i - 1; 
            }
        });
        const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey);
        if (newChatBoxes.length) {
            if (newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newChatBoxes[lastIndex].key;
                } else { 
                    newActiveKey = newChatBoxes[0].key; 
                }
            }
        } else 
            newActiveKey = ""; // No chatBox left
        setChatBoxes(newChatBoxes);
        setActiveKey(newActiveKey);
    };

    return (
        <> 
            <div className="App-title"> 
            <h1>{me}'s Chat Room</h1> </div> <div className="App-messages"> 
            <Tabs 
                type="editable-card" 
                activeKey={activeKey}
                onChange={(key) => { setActiveKey(key); }}
                onEdit={(targetKey, action) => {
                    if (action === "add") 
                        addChatBox();
                    else if (action === "remove") 
                        removeChatBox(targetKey);
                }}
            >
            {
                chatBoxes.map(({friend, key, chatLog }) => {
                    return (
                        <TabPane tab={friend} key={key} closable={true}>
                        <p> {friend}'s chatbox. </p>
                        {chatLog.map(({name, body}) => (
                            (name == me) ? <div className="fromMe"> <p className="message"> {body} </p> <p className="name"> {name} </p></div>
                                : <div className="fromFriend"> <p className="name"> {name} </p><p className="message"> {body} </p> </div>
                        ))}
                        </TabPane>
                    );
                })
            }
            </Tabs>
            <ChatModal
                visible={modalVisible}
                onCreate={({ name }) => {
                    // createChatBox(name);
                    startChat(name);
                    setModalVisible(false);
                }}
                onCancel={() => {
                    setModalVisible(false);
                }}
            />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) =>
                setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
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
                    sendMessage({ key: activeKey, body: msg });
                    setMessageInput("");
                }}
 
            ></Input.Search>
    </>);
};
export default ChatRoom;
