import { useState } from "react"; 
const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);

  const createChatBox = (friend, me, log) => {
    const newKey = [me,friend].sort().join('_')
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend +
                      "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    const chatLog = log;
    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);
    //setActiveKey(newKey);
    return newKey;
  };

  const removeChatBox = (targetKey, activeKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) { lastIndex = i - 1; }});
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
    //setActiveKey(newActiveKey);
    return newActiveKey;
  };
  return { chatBoxes, createChatBox, removeChatBox };
};
export default useChatBox;
