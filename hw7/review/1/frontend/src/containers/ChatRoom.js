import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, message } from "antd";
import useChatBoxes from "../hooks/useChatBoxes";
import ChatModal from './ChatModal'
import ChatBox from '../components/ChatBox'

const { TabPane } = Tabs;
const ChatRoom = ({ me }) => {

  const [messageInput, setMessageInput] =
    useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const addChatBox = () => { setModalVisible(true); };

  const [activeKey, setActiveKey] = useState("")
  const friend = activeKey.split('_').find(name => name !== me) || me

  const { chatBoxes, createChatBox, removeChatBox, sendMessage, status } = useChatBoxes()

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])

  return (
    <> <div className="App-title">
      <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
          onEdit={(targetKey, action) => {
            if (action === "add") {
              addChatBox()
            }
            else if (action === "remove") {
              const newKey = removeChatBox(targetKey, me, activeKey);
              setActiveKey(newKey)
            }
          }}

        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {

            return (
              <TabPane tab={friend}
                key={key} closable={true}>
                <p>{friend}'s chatbox.</p>
                <ChatBox
                  me={me}
                  messages={chatLog}
                />
              </TabPane>
            );
          })}
        </Tabs>
      </div>

      {
        chatBoxes.length !== 0 &&
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
            sendMessage({ name: me, to: friend, body: msg });
            setMessageInput("");
          }}

        ></Input.Search>
      }
      <ChatModal
        visible={modalVisible}
        onCreate={({ name }) => {
          const newKey = createChatBox(name, me, activeKey);
          setActiveKey(newKey)
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />

    </>);
};
export default ChatRoom;
