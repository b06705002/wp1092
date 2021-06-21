import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
    subscription message (
        $chatBoxName: String!
    ) {
        message (
            chatBoxName: $chatBoxName
        ) {
            mutation
            data {
                id
                sender {
                    id 
                    name
                }
                body
            }
        }
    }
`;