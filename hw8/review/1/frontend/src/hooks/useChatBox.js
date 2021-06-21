import { useState } from 'react'

const useChatBox = (me, activeKey) => {
    const [chatBoxes, setChatBoxes] = useState([])

    const createChatBox = (friend) => {
        const newKey = me <= friend ? `${me}-${friend}` : `${friend}-${me}`     // compare the length of friend's name and mine
        if (chatBoxes.some(({ key }) => key === newKey)) {
            throw new Error(friend+"'s chat box has already opened.")
        }
        const newChatBoxes = [...chatBoxes]
        newChatBoxes.push({ friend, key: newKey })
        setChatBoxes(newChatBoxes)
        return newKey       // return newKey and setActiveKey back in ChatRoom
    }

    const removeChatBox = (targetKey) => {
        let newActiveKey = activeKey
        let lastIndex
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) lastIndex = i - 1
        })
        const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey)
        if (newChatBoxes.length) {
            if (newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newChatBoxes[lastIndex].key
                } else {
                    newActiveKey = newChatBoxes[0].key
                }
            } else {
                newActiveKey = activeKey
            }
        }
        setChatBoxes(newChatBoxes)
        return newActiveKey
    }

    return { chatBoxes, createChatBox, removeChatBox }
}

export default useChatBox