import { gql } from "@apollo/client";

export const CREATE_FRIENDS_MUTATION = gql`
  mutation createFriends($input: CreateFriendsInput!) {
    createFriends(input: $input) {
      ok
      error
    }
  }
`;
