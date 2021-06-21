import { useEffect } from 'react';
import {  Tag  } from "antd";
import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import "./ChatLog.css";


const ALL_MESSAGE_QUERY = gql`
  query getAllMessage($key:String!) {
    chatboxs(name:$key) {
      id
      messages{
        sender
        body
      }
    }
  }
`;

const MESSAGES_SUBSCRIPTION=gql`
  subscription($boxname:String!){
  messages(chatboxName:$boxname){
    sender
    body
  }
}
`



function  ChatLog( {chatlog, me, friend} ){

  const chatbox_key = [me,friend].sort().join('_');
  const { data, subscribeToMore, refetch } = useQuery(ALL_MESSAGE_QUERY,{variables:{key:chatbox_key}})
  
  if(data && data.chatboxs.messages.length < chatlog.length)
    refetch()

  useEffect(() => {
    const abortController = new AbortController();
    const unsub =subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        variables:{boxname:[me,friend].sort().join('_')},
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newPost = subscriptionData.data.messages;
          //console.log("prev",prev,"subscriptionData.data",subscriptionData.data,"newPost",newPost)
          return {
           /* ...prev,
            messages: [...prev.chatboxs.messages, newPost],*/
            chatboxs:{
              id:prev.chatboxs.id,
              messages: [...prev.chatboxs.messages, newPost]
            }
          };
        },
      });
    return () => {
      unsub();
      console.log("willUnmount")
      abortController.abort();
    }
  }, [subscribeToMore,me,friend]);

  if(data)
    return (
      <ul>
        {
          data.chatboxs.messages.map((item,index) => {
          if(item.sender===me)
            return (<li className="rtl" key={index}>{item.body} <Tag color="geekblue">{item.sender}</Tag></li>) 
          else
            return (<li className="ltr" key={index}> <Tag color="magenta">{item.sender}</Tag>{item.body}</li>)
          })
        }  
      </ul>
    );
  else 
    return(<p> Loading... </p>)
};
export default ChatLog;
