import { useQuery } from '@apollo/react-hooks'
import { useState, useEffect } from 'react'
import { CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from '../graphql'
import { Tag } from 'antd'

const ChatBox =({ boxName, friend }) => {
    const [messages, setMessages] = useState([])
    const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables: {
            name: boxName
        }
    })

    useEffect(() => {
        if (loading) console.log("Loading...")
        if (error) console.log("Error: ", error)
        if (!loading && !error) {
            const msgList = data.chatBoxes.messages
            setMessages(msgList)
        }
    }, [data])

    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { chatBoxName: boxName },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    const newMessage = subscriptionData.data.message.data
                    setMessages([...prev.chatBoxes.messages, newMessage])
                    return {
                        ...prev, 
                        chatBoxes: [...prev.chatBoxes.messages, newMessage]
                    }
                },
            })
        } catch(e) { console.log(e) }
    }, [subscribeToMore])

    if (messages.length == 0) return (
        <p>{friend}'s chatbox.</p>
    )
    
    return (
        <div>
            {messages.map(({ body, sender }) => {
                return sender.name == friend ? 
                    (<div style={{ display:'flex', justifyContent:'flex-start', padding:4 }}>
                        <Tag color='blue'>{sender.name}</Tag>{body}
                    </div>)
                :
                    (<div style={{ display:'flex', justifyContent:'flex-end', padding:4 }}>
                        {body}<Tag color='blue'>{sender.name}</Tag>
                    </div>)
            })}
                
        </div>
    )

}

export default ChatBox

