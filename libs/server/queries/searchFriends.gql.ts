import { gql } from "@apollo/client";
import { USER_FIELDS } from "../fragments";

export const SEARCH_FRIENDS_QUERY = gql`
  ${USER_FIELDS}
  query searchFriends($input: SearchFriendsInput!) {
    searchFriends(input: $input) {
      users {
        ...UserFields
      }
    }
  }
`;
