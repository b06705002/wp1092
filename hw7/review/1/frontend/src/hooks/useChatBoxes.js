import { useState } from "react";
import client from '../wsClient'

const useChatBoxes = () => {
  const [chatBoxes, setChatBoxes] = useState([
    // {
    //   friend: "Mary", key: "MaryChatbox",
    //   chatLog: []
    // },
    // {
    //   friend: "Peter", key: "PeterChatBox",
    //   chatLog: []
    // }
  ]);

  function findChatBox() {

  }
  function createKey(me, friend) {
    const newKey = me <= friend ?
      `${me}_${friend}` : `${friend}_${me}`;
    return newKey
  }

  const createChatBox = (friend, me, activeKey) => {
    const newKey = createKey(me, friend)

    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend +
        "'s chat box has already opened.");
    }

    const newChatBoxes = [...chatBoxes];
    const chatLog = [];
    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);

    client.sendChat({ name: me, to: friend })
    return (newKey);

  };

  const sendMessage = ({ name, to, body }) => {

    client.sendMessage({ name, to, body })
  }

  const removeChatBox = (targetKey, me, activeKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) { lastIndex = i - 1; }
    });
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else { newActiveKey = newChatBoxes[0].key; }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);
    return (newActiveKey);
  };


  const [status, setStatus] = useState({}); // { type, msg }



  client.onmessage = (byteString) => {
    const { data } = byteString;
    const { type, data: chatData } = JSON.parse(data);
    switch (type) {
      case "CHAT": {
        const { name, to, messages } = chatData
        const chatBoxKey = createKey(name, to)
        const newChatBoxes = [...chatBoxes]
        const index = newChatBoxes.findIndex(({ key }) => key === chatBoxKey)
        newChatBoxes[index].chatLog = messages

        setChatBoxes(newChatBoxes);
        break;
      }
      case "MESSAGE": {
        const { name, to, message } = chatData
        const chatBoxKey = createKey(name, to)
        const newChatBoxes = [...chatBoxes]
        const index = newChatBoxes.findIndex(({ key }) => key === chatBoxKey)
        newChatBoxes[index].chatLog.push(message)

        setChatBoxes(newChatBoxes);
      }
      case "cleared": {
        // setMessages([]);
        break;
      }
      case "status": {
        setStatus(chatData); break;
      }

      default: break;
    }
  }

  // const clearMessages = () => {
  //   sendData(["clear"]);
  // };


  return {
    chatBoxes, createChatBox, removeChatBox, status
    , sendMessage
  };
};
export default useChatBoxes;
