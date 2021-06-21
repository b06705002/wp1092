import "../App.css";
import ChatModal from "../Components/ChatModal"
import ChatLog from "./ChatLog"
import useChatBox from "../hooks/useChatbox"
import { useState } from "react";
import { Tabs, Input } from "antd";
import { useMutation } from '@apollo/react-hooks';
import { gql } from '@apollo/client';

const CREATE_CHATBOX_MUT = gql`
  mutation CreateChatBox($name1: String!, $name2: String!) {
    createChatBox(name1: $name1,  name2: $name2) {
      id
      name
      messages{
        sender
        body
      }
    }
  }
`;

const CREATE_MESSAGE_MUT = gql`
  mutation CreateMESSGAE($send: String!, $to: String!, $body:String!) {
    createMessage(send: $send,  to: $to, content:$body) {
      id
      sender
      body
    }
  }
`;

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const [startChat] = useMutation(CREATE_CHATBOX_MUT)
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUT)
  const addChatBox = () => { setModalVisible(true); };
  


  return (
    <> <div className="App-title">
         <h1>{me}'s Chat Room</h1> </div>
         <div className="App-messages">
        <Tabs type="editable-card" 
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") {const newActiveKey = removeChatBox(targetKey, activeKey);setActiveKey(newActiveKey);}
          }}
        >
        {chatBoxes.map(({ friend, key, chatLog }) => {           
            return (
              <TabPane tab={friend} 
                key={key} closable={true}>
                <p>{friend}'s chatbox.</p>
                <ChatLog chatlog={chatLog} me={me} friend={friend}/>
              </TabPane>
            );})}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={async ({ name }) => {
            const {data} = await startChat({variables:{name1:name, name2:me}});
            //const chatbox_key = [me,name].sort().join('_');
            //const { loading, error, data, subscribeToMore } = await useQuery(ALL_MESSAGE_QUERY,{variables:{key:chatbox_key}})
            //console.log(data.createChatBox.messages);
            const newKey = createChatBox(name, me, data.createChatBox.messages);
            setActiveKey(newKey);
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
        placeholder=
          "Enter message here..."
        onSearch={async (msg) => {
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
          await sendMessage({variables: { send:me, to: activeKey, body: msg }});
          //console.log('msg_data:',data)
          setMessageInput("");
        }}
      ></Input.Search> 
  </>);
};
export default ChatRoom;
