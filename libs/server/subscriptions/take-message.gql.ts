import { gql } from "@apollo/client";

export const TAKE_MESSAGE_SUBSCRIPTION = gql`
  subscription takeMessage($input: TakeMessageInput!) {
    takeMessage(input: $input) {
      id
      createdAt
      payload
      user {
        id
        name
        avatar
      }
    }
  }
`;
