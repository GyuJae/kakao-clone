import { gql } from "@apollo/client";
import { USER_FIELDS } from "../fragments";

export const SEE_FRIENDS_QUERY = gql`
  ${USER_FIELDS}
  query seeFriends {
    seeFriends {
      friends {
        ...UserFields
      }
    }
  }
`;
