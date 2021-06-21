import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
    query chatBoxes(
        $name: String!
    ) {
        chatBoxes(
            name: $name
        ) {
            id
            name
            messages {
                id
                body
                sender {
                    id
                    name
                }
            }
        }
    }
`;