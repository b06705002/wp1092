import { gql } from '@apollo/client';

const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox(
        $name1: String!
        $name2: String!
    ) {
        createChatBox(
            name1: $name1
            name2: $name2
        ) {
            id
            name
        }
    }
`;


const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage(
        $chatBoxName: String!
        $from: String!
        $body: String!
    ) {
        createMessage(
            data: {
                chatBoxName: $chatBoxName
                from: $from
                body: $body
            } 
        ) {
            id
            sender {
                name
            }
            body
        }
    }
`;

// const mutations = {
//     CREATE_CHATBOX_MUTATION,
//     CREATE_MESSAGE_MUTATION
// }

export { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION };