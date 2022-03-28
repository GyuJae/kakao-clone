import { gql } from "@apollo/client";

export const READ_MESSAGES_QUERY = gql`
  query readMessages($input: ReadMessagesInput!) {
    readMessages(input: $input) {
      messages {
        id
        payload
        createdAt
        user {
          id
          avatar
          name
        }
      }
    }
  }
`;
